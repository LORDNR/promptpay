import { Router, Request, Response } from "express";
import generatePayload from 'promptpay-qr'
import QRCode from "qrcode";
import _ from 'lodash'
export const routes = Router()

routes.post('/generateQR', async (req: Request, res: Response) => {
    const phoneNo = String(req.body.phoneno)
    const amount = await parseFloat(_.get(req, ["body", "amount"]))
    const payload = generatePayload(phoneNo, { amount })
    const option = {
        color: {
            dark: "#000",
            light: "#fff"
        }
    }

    QRCode.toDataURL(payload, option, (err, url) => {
        if (err) {
            console.log('generate fail');
            return res.status(400).json({
                RespCode: 400,
                RespMessage: `Bad : ${err}`
            })
        } else {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
                Result: url
            })
        }
    })
})