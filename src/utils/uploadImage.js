const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { successRes } = require("./response");

// Utility to create multer configuration
const createMulter = (options = {}) => {
    const {
        folder = "uploads/miscellaneous",
        fileSize = 10000000,
        fileTypes = /jpeg|jpg|png|pdf|doc|docx|txt|xls|xlsx|csv|json|zip|rar/,
    } = options;

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            const fileName = `${Date.now()}.${ext}`;
            cb(null, fileName);
        },
    });

    const checkFileType = (file, cb) => {
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            const allowedExtensions = fileTypes
                .toString()
                .toUpperCase()
                .replace(/^\//, "")
                .replace(/\/$/, "")
                .replace(/\|/g, ", ");
            const errorMessage = `Only ${allowedExtensions} files are allowed.`;
            return cb(new Error(errorMessage));
        }
    };

    return multer({
        storage: storage,
        limits: { fileSize: fileSize },
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        },
    });
};

// Middleware for single file upload
const uploadSingleFile = (fieldName, options) => {
    const upload = createMulter(options).single(fieldName);
    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === "LIMIT_FILE_SIZE") {
                        const message = `File too large. Maximum size is ${options.fileSize / 1000000
                            }MB.`;
                        return successRes(res, 400, false, message);
                    }
                    return successRes(res, 400, false, err.message);
                } else {
                    return successRes(res, 400, false, err.message);
                }
            }
            next();
        });
    };
};

// Middleware for multiple file uploads
const uploadMultipleFiles = (fieldName, maxCount, options) => {
    const upload = createMulter(options).array(fieldName, maxCount);
    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === "LIMIT_FILE_SIZE") {
                        const message = `File too large. Maximum size is ${options.fileSize / 1000000
                            }MB.`;
                        return successRes(res, 400, false, message);
                    }
                    if (err.code === "LIMIT_UNEXPECTED_FILE") {
                        const message = `Too many files. Maximum allowed is ${maxCount}.`;
                        return successRes(res, 400, false, message);
                    }
                    return successRes(res, 400, false, err.message);
                } else {
                    return successRes(res, 400, false, err.message);
                }
            }
            next();
        });
    };
};

module.exports.uploadUserAvatar = uploadSingleFile("image", {
    fileTypes: /jpeg|jpg|png/,
    folder: "src/uploads/profile",
});

module.exports.uploadSingleFile = uploadSingleFile;
module.exports.uploadMultipleFiles = uploadMultipleFiles;
