import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// Load Components
import MapFactory from '../MapFactory/MapFactory';
import Environments from '../../components/Environments';
import CameraIP from '../../components/CameraIP';
import ReportChart from '../../components/ReportChart';
import JobList from '../../components/JobList';
import WorkArea from '../../components/WorkArea';
import rootPath from '../../configs/rootPath';

class Home extends Component {

  componentDidMount() {
    if (window.innerWidth <= 1366) {
      document.body.classList.add('sidebar-collapse');
    }else {
      document.body.classList.remove('sidebar-collapse');
    }
  }

  render() {
    return (
      // <div>
      //   <div>
      //     <div className="row">
      //       <div className="col-lg-3">
      //         <div id="report-charts">
      //           <h4>Report Charts</h4>
      //           <ReportChart />
      //         </div>
      //       </div>

      //       <div className="col-lg-2">
      //         <div id="job-list">
      //           <h4>Job List</h4>
      //           <JobList />
      //         </div>
      //       </div>

      //       <div className="col-lg-5">
      //         <div id="ip-camera">
      //           <h4>IP CAMERA</h4>
      //           <CameraIP />
      //         </div>
      //       </div>

      //       <div className="col-lg-2">
      //         <div id="table-env">
      //           <Link to={`${rootPath}/environments`}>
      //             <h4><i className="fab fa-envira"></i> Environments</h4>
      //           </Link>
      //           <Environments />
      //         </div>
      //       </div>

      //       <div className="col-lg-5 mt-4">
      //         <div id="map-factory">
      //           <MapFactory />
      //         </div>
      //       </div>

      //       <div className="col-lg-7">

      //         <div id="table-work-area">

      //           <Link to={`${rootPath}/work-area`}>
      //             <h4><i className="fas fa-cog"></i> Work Area</h4>
      //           </Link>
      //           <WorkArea />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <div id="map-factory">
                  <MapFactory />
                </div>
              </div>

              <div className="col-md-12">
                <div id="job-list">
                  <h4><i className="fas fa-list nav-icon"></i> Job list</h4>
                  <JobList />
                </div>
              </div>

              <div className="col-md-12">
                <div id="report-charts">
                  <h4>รายงานสรุปการทำงาน</h4>
                  <ReportChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <div id="ip-camera">
                  <h4><i className="fas fa-video nav-icon"></i> IP CAMERA</h4>
                  <CameraIP />
                </div>
              </div>

              <div className="col-sm-4 col-md-4 col-lg-4">
                <div id="table-env">
                  <Link to={`${rootPath}/environments`}>
                    <h4><i className="fab fa-envira"></i> Environments</h4>
                  </Link>
                  <Environments />
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-12">
                <div id="table-work-area">
                  <Link to={`${rootPath}/work-area`}>
                    <h4><i className="fas fa-people-carry nav-icon"></i> Work Area</h4>
                  </Link>
                  <WorkArea />
                </div>
              </div>
              {/* <div className="col-md-12">
                <h4>Dangerous area</h4>
                <div className="d-flex justify-content-between">
                  <div>location</div>
                  <div>time</div>
                  <div>who</div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;