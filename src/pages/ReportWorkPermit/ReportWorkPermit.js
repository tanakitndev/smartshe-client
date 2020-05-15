import React, { useState, useEffect } from "react";
import TextInfo from "./TextInfo";
import OperatingTime from "./OperatingTime";
import SecurityInfo from "./SecurityInfo";
import Axios from "axios";
import http from "../../configs/http";

import { useParams } from "react-router-dom";

import { saveAs } from "file-saver";

const ReportWorkPermit = () => {
  let { work_permit_id } = useParams();

  const [workPermitData, setWorkPermitData] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [workPermitHotQuestions, setWorkPermitHotQuestions] = useState([]); // confineQuestions
  const [workPermitHighQuestions, setWorkPermitHighQuestions] = useState([]); // confineQuestions
  const [workPermitConfineQuestions, setWorkPermitConfineQuestions] = useState([]); // confineQuestions
  const [notices, setNotices] = useState([]);
  const [protections, setProtections] = useState([]);
  const [verify, setVerify] = useState([]);


  // const [permitEnable, setPermitEnable] = useState({
  //   hotwork: false,
  //   heightwork: false,
  //   confinework: false,
  // });

  useEffect(() => {
    const fetchWorkPermitById = async () => {
      const rp = await Axios.get(
        `${http}/api/v1/report_work_permit/${work_permit_id}`
      );
      const {
        error,
        notices,
        protections,
        verify,
        data,
        helpers,
        work_permit_questions,
      } = rp.data;
      if (!error) {
        let permit_enable = JSON.parse(data.permit_enable);
        let newData = data;
        console.log(permit_enable);

        newData.permit_enable = permit_enable;

        setWorkPermitData(data);
        setHelpers(helpers);
        setNotices(notices);
        setProtections(protections);
        setVerify(verify);

        let fillterOwner = work_permit_questions.filter((el) => {
          return el.approved_role === "owner";
        });
        console.log("fillterOwner", fillterOwner);
        setWorkPermitConfineQuestions(fillterOwner);

        let filterHigh = work_permit_questions.filter((el) => {
          return el.work_permit_type_name === "heightwork";
        });
        console.log("filterHigh", filterHigh);
        setWorkPermitHighQuestions(filterHigh);

        let filterHot = work_permit_questions.filter((el) => {
          return el.work_permit_type_name === "hotwork";
        });
        console.log("filterHot", filterHot);
        setWorkPermitHotQuestions(filterHot);
      }
    };
    fetchWorkPermitById();
  }, [work_permit_id]);

  const typeWorks = (permitEnable) => {
    let str = [];
    for (const property in permitEnable) {
      if (permitEnable[property]) {
        str.push(property);
      }
    }
    return str.join(", ");
  };

  const createAndDownloadHotworkPdf = () => {
    Axios.post(`${http}/api/v1/report_work_permit/create-hot-pdf`, {
      questions: workPermitHotQuestions,
      location_name: workPermitData["location_name"],
      created_at: workPermitData["created_at"],
    }).then(() => {
      Axios.get(`${http}/api/v1/report_work_permit/fetch-hot-pdf`, {
        responseType: "blob",
      }).then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, `hot-work-${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear() + 543}.pdf`);
      });
    });
  };

  const createAndDownloadHighworkPdf = () => {
    Axios.post(`${http}/api/v1/report_work_permit/create-high-pdf`, {
      questions: workPermitHighQuestions,
      location_name: workPermitData["location_name"],
      created_at: workPermitData["created_at"],
    }).then(() => {
      Axios.get(`${http}/api/v1/report_work_permit/fetch-high-pdf`, {
        responseType: "blob",
      }).then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `high-work-${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear() + 543}.pdf`);
      });
    });
  };

  const createAndDownloadConfinePdf = () => {
    const performersList = helpers.filter((el) => {
      return el.section === "performers";
    });
    const helpersList = helpers.filter((el) => {
      return el.section === "helpers";
    });
    const conservatorsList = helpers.filter((el) => {
      return el.section === "conservators";
    });
    Axios.post(`${http}/api/v1/report_work_permit/create-confine-pdf`, {
      name: workPermitData["displayname"],
      position: workPermitData["right1"],
      job_member: workPermitData["job_member"],
      performers: performersList,
      helpers: helpersList,
      conservators: conservatorsList,
      description: workPermitData["description"],
      location_name: workPermitData["location_name"],
      created_at: workPermitData["created_at"],
      department_name: workPermitData["department_name"],
      verify: verify,
      questions: workPermitConfineQuestions,
      notices: notices,
      protections: protections,
    }).then(() => {
      Axios.get(`${http}/api/v1/report_work_permit/fetch-confine-pdf`, {
        responseType: "blob",
      }).then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, `confine-work-${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear() + 543}.pdf`);
      });
    });
  };

  return (
    <div>
      <h1>Report Work Permit</h1>

      {workPermitData.permit_enable && workPermitData.permit_enable["hotwork"] && (
        <button
          className="btn btn-warning btn-sm mx-1"
          onClick={createAndDownloadHotworkPdf}
        >
          Dowload Hot Work Report PDF
        </button>
      )}
      {workPermitData.permit_enable && workPermitData.permit_enable["heightwork"] && (
        <button
          className="btn btn-success btn-sm mx-1"
          onClick={createAndDownloadHighworkPdf}
        >
          Dowload High Work Report PDF
        </button>
      )}
      {workPermitData.permit_enable && workPermitData.permit_enable["confinework"] && (
        <button
          className="btn btn-default btn-sm mx-1"
          style={{ backgroundColor: "pink" }}
          onClick={createAndDownloadConfinePdf}
        >
          Dowload Confine Work Report PDF
        </button>
      )}
      <div className="row mt-3">
        <div className="col-md-6">
          <TextInfo label="วันที่ปฏิบัติงาน" text={workPermitData.work_at} />
          <TextInfo label="ชื่อผู้ขออนุญาต" text={workPermitData.displayname} />
          <TextInfo
            label="ชื่อหน่วยงานผู้รับเหมา/หน่วยงานที่ปฏิบัติงาน"
            text="xxx"
          />
          <TextInfo
            label="สถานที่/บริเวณที่ปฏิบัติงาน"
            text={
              workPermitData.location_name + " / " + workPermitData.area_floor
            }
          />
          <TextInfo label="ชื่อผู้ควบคุม" text={workPermitData.team} />

          <TextInfo
            label="ชื่อผู้ขออนุญาตเข้าปฏิบัติงาน (จำนวน x คน)"
            text={workPermitData.job_member}
          />
        </div>
        <div className="col-md-6">
          <OperatingTime />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div>ลักษณะงานที่ทำ: {typeWorks(workPermitData.permit_enable)}</div>
          <div>ชื่อผู้ขออนุญาตปฏิบัติงาน: {workPermitData.displayname}</div>
        </div>
      </div>

      <hr className="bg-white" />

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="d-flex">
            <div>ชื่อผู้ช่วยเหลือ:</div>
            <div className="ml-2">
              {helpers.map((el) => {
                return (
                  <div key={el.id}>
                    {el.name} ({el.position}) ความดัน {el.press}/{el.pulse}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <SecurityInfo data={workPermitConfineQuestions} verify={verify} />

      {/* <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
      </PDFViewer> */}
    </div>
  );
};

export default ReportWorkPermit;
