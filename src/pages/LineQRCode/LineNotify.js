import React from 'react';
import qrcode from '../../assets/line/qrcode.jpg'

const LineNotify = () => {
    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <h2>Line Notify</h2>
                    <div style={{
                        fontSize: 20,
                        letterSpacing: 10
                    }}> SMART SHE</div>
                </div>
                <div className="mt-3">
                    <img src={qrcode} style={{ width: 600 }} className="img-fluid" alt="QRCode Join With Notify" />
                </div>
            </div>
        </div>
    )
}

export default LineNotify;