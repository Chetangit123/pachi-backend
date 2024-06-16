module.exports.successResponse = (res, success = true, status = 200, message, data = null) => {
    return res.status(status).json({
        success: success,
        status: status,
        message: message,
        data: data
    })
}

module.exports.failureResponse = (res, success = false, status, message, data = null) => {
    return res.status(status).json({
        success: success,
        status: status,
        message: message,
        data: data
    })
}

module.exports.notFound = (res, title, data = []) => {
    return res.status(404).json({
        success: false,
        status: 404,
        message: `${title} Not Found.`,
        data: data
    })
}

module.exports.catchError = (res, error) => {
    return res.status(500).json({
        success: false,
        status: 500,
        message: error.message
    })
}

module.exports.swrResponse = (res) => {
    return res.status(500).json({
        success: success,
        status: 500,
        message: 'Something went wrong'
    })
}