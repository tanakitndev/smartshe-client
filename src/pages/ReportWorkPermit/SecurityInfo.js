import React from "react";

const SecurityInfo = (props) => {
  return (
    <div>
      <div> > ตรวจสอบด้านความปลอดภัยก่อนเริ่มปฏิบัติงาน</div>
      <div className="row">
        <div className="col-md-6">
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
              fontSize: 18,
            }}
          >
            A. ตรวจสอบความปลอดภัยก่อนเริ่มและหลังปฏิบัติงาน
          </div>
          {props.data
            .filter((el) => el.work_permit_confine_type_id === 1)
            .map((el, index) => {
              return <ListItemA key={index} index={index} data={el} />;
            })}
        </div>
        <div className="col-md-6">
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
              fontSize: 18,
            }}
          >
            B. ตรวจสอบอุปกรณ์คุ้มครองความปลอดภัย
          </div>
          {props.data
            .filter((el) => el.work_permit_confine_type_id === 2)
            .map((el, index) => {
              return <ListItemB key={index} index={index} data={el} />;
            })}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 5,
              marginTop: 10,
              fontSize: 18,
            }}
          >
            C. ตรวจวัดปริมาณสารเคมี ชื่อผู้ตรวจ xxx
          </div>
          <ListItemC no="1" title="ออกซิเจน" value={props.verify ? props.verify['oxygen']: '0'} unit="%" label="ต้องอยู่รหว่าง 19.5 - 23.5"/>
          <ListItemC no="2" title="สารไวไฟ" value={props.verify ? props.verify["gas"]: '0'} unit="%" label="ต้องไม่เกิน 10%LEL"/>
          <ListItemC no="3" title="H2S" value={props.verify ? props.verify["h2s"]: '0'} unit="ppm" label="ต้องไม่เกิน 0 ppm"/>
          <ListItemC no="4" title="CO" value={props.verify ? props.verify["co"]: '0'} unit="ppm" label="ต้องไม่เกิน 0 ppm"/>
        </div>
      </div>
    </div>
  );
};

const ListItemA = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        {props.index + 1}. {props.data.work_permit_question_title}
      </div>
      <div style={{ flex: 1 }}>
        {props.data.value === "1" ? "ใช่" : "ไม่ใช่"}
      </div>
    </div>
  );
};

const ListItemB = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1 }}>
        {props.index + 1}. {props.data.work_permit_question_title}
      </div>
      <div style={{ flex: 1 }}>{props.data.value === "1" ? "มี" : "ไม่มี"}</div>
    </div>
  );
};

const ListItemC = (props) => {
  return (
    <div>
      {props.no}. {props.title} {props.value} {props.unit} ({props.label})
    </div>
  );
};

export default SecurityInfo;
