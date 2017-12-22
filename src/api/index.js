import request from 'superagent'

export const uploadSrt = (file) => {
    const url = `${process.env.REACT_APP_API_URL}/upload`
    const req = request.post(url).withCredentials()
    req.attach("srt", file)
    return req.then(
        res => JSON.parse(res.text),
        err => Error(err)
    )
}

export const translate = (word) => {
    const url = `${process.env.REACT_APP_API_URL}/translate/${word}`
    return request.get(url).withCredentials().then(
        res => JSON.parse(res.text),
        err => Error(err)
    )
}