import React from "react";

const OperatingTime = (props) => {
  return (
    <div className="row">
      <div className="col-md-4">ระยะเวลาปฏิบัติงาน:</div>
      <div className="col-md-8">
        <div>เช้า 08:00 - 17.00 น.</div>
        <div>เย็น 17:00 - 00.00 น.</div>
        <div>ดึก 00:00 - 08.00 น.</div>
      </div>
    </div>
  );
};

export default OperatingTime;
