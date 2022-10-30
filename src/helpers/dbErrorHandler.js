const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists'
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message
        }
    }
    return message
}

const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = err.message.split('index: ')[1].split('_')[0]
        output = `${fieldName} already exists`
    } catch (err) {
        output = 'Username already exists'
    }
    return output
}

export default {getErrorMessage, getUniqueErrorMessage}