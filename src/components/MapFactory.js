import React, { useState, useEffect } from 'react'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

import rootPath from '../configs/rootPath';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import http from '../configs/http';

// import { useSelector } from 'react-redux';

import socketIOClient from 'socket.io-client'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 14.783753, lng: 101.957377 }}
        mapTypeId="satellite"
        onClick={props.onClick}
    >

        {props.isMarkerShown &&
            <div>
                {props.markers.map((marker, index) => {
                    return (
                        <Marker key={index} onClick={props.handleToggleOpen} position={{ lat: marker.coordinate.lat, lng: marker.coordinate.lng }} >
                            {props.isOpen &&
                                <InfoWindow onCloseClick={props.handleCloseCall}>
                                    <span className="text-dark">{marker.name}</span>
                                </InfoWindow>
                            }
                        </Marker>
                    )
                })}
                {/* {props.markers.map((marker, index) => {
                    return (
                        <Marker key={index} position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}></Marker>
                    )
                })} */}
            </div>
        }
    </GoogleMap>
))

const MapFactory = withRouter(props => {
    // console.log(props);
    const [activeUri, setActiveUri] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [endpoint, setEndpoint] = useState(http);
    const [markers, setMarkers] = useState([]);

    const handleToggleOpen = () => {
        setIsOpen(true)
    }

    const handleToggleClose = () => {
        setIsOpen(false)
    }

    // const markers = useSelector(state => state.markers);
    // console.log(markers);


    useEffect(() => {
        setActiveUri(props.location.pathname);
        setEndpoint(http);
        checkOnline();

        const responseData = () => {
            const socket = socketIOClient(endpoint)
            socket.on('job-list', (data) => {
                if (data.length > 0) {
                    let myMarkers = [];
                    for (let i in data) {
                        myMarkers.push({
                            ...data[i],
                            coordinate: {
                                lat: parseFloat(data[i].lat),
                                lng: parseFloat(data[i].lng)
                            }
                        })
                    }
                    setMarkers(myMarkers);
                    // console.log('map_markers:', data);
                }
            });
        }
        responseData();

        const fetchWorkPermitActive = async () => {
            const response = await axios.get(`${http}/api/v1/joblist`);
            const { data } = response.data;

            let myMarkers = [];
            for (let i in data) {
                myMarkers.push({
                    ...data[i],
                    coordinate: {
                        lat: parseFloat(data[i].lat),
                        lng: parseFloat(data[i].lng)
                    }
                })
            }
            setMarkers(myMarkers);

            // console.log('dd', data);
        }
        fetchWorkPermitActive();
    }, [props, endpoint]);





    const checkOnline = () => {

        axios.get(`${http}/api/v1/test`)
            .then(res => {
                const data = res.data;
                // console.log(data);

                setIsOnline(data.status);
            });
    }

    function renderMap() {

        return <MyMapComponent
            markers={markers}
            // markers={markersAll}
            // markers={markers}
            // &key=AIzaSyCAF3vtQPCvMIK3kCOawnpKoL_6ITUzdL4
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCAF3vtQPCvMIK3kCOawnpKoL_6ITUzdL4"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onClick={(e) => {
                // Find Lat Long
                // console.log(e.latLng.lat(), e.latLng.lng());
            }}
            isOpen={isOpen}
            handleToggleOpen={() => {
                handleToggleOpen();
            }}
            handleCloseCall={() => handleToggleClose()}
        />
    }

    return (
        <div>
            <div style={{
                height: activeUri === `${rootPath}/map-factory` ? '100vh' : '50vh',
                // marginTop: 10,
                paddingBottom: 10,
            }}>
                {isOnline ? renderMap() : null}
            </div>

        </div>
    )
})

export default MapFactory;



    // const markersAll = [
    //     { id: 1, name: 'โร่งฉ่ำ LAB', coordinate: { lat: 14.782742655517051, lng: 101.95667148763852 } },
    //     { id: 2, name: 'สำนักงานธุรการ AM', coordinate: { lat: 14.782724817358577, lng: 101.95717287541625 } },
    //     { id: 3, name: 'ห้องปฏิบัติการ LAB', coordinate: { lat: 14.782885821919047, lng: 101.95674789636058 } },
    //     { id: 4, name: 'ศูนญ์เล่นและเรียนรู้ AM', coordinate: { lat: 14.783006762184243, lng: 101.95636310361256 } },
    //     { id: 5, name: 'สำนักงานขายหน้าร้าน SA', coordinate: { lat: 14.783176789207584, lng: 101.95768423505916 } },
    //     { id: 6, name: 'สำนักงานวิศวกรรม EN', coordinate: { lat: 14.783683395030506, lng: 101.95628718452019 } },
    //     { id: 7, name: 'Boiler EN', coordinate: { lat: 14.784191051946044, lng: 101.9564011770410 } },
    //     { id: 8, name: 'โกดังเชื้อเพลิง EN', coordinate: { lat: 14.78456601359524, lng: 101.95651785313316 } },
    //     { id: 9, name: 'อาคารผลิต PD', coordinate: { lat: 14.783812254503793, lng: 101.95742742998999 } },
    //     { id: 10, name: 'Hot Room RM', coordinate: { lat: 14.78373751747429, lng: 101.95772915377268 } },
    //     { id: 11, name: 'Dryer RM', coordinate: { lat: 14.784451579824012, lng: 101.95685312205646 } },
    //     { id: 12, name: 'Wet Bin RM', coordinate: { lat: 14.784410505592096, lng: 101.95713929011615 } },
    //     { id: 13, name: 'Work House RM', coordinate: { lat: 14.784381282040105, lng: 101.95754130084035 } },
    //     { id: 14, name: 'คูโบล่า RM', coordinate: { lat: 14.784481277295775, lng: 101.95757779995012 } },
    //     { id: 15, name: 'โกดังวัตถุดิบ RM', coordinate: { lat: 14.784053678791823, lng: 101.95692343400917 } },
    //     { id: 16, name: 'ทางเท C RM', coordinate: { lat: 14.784801877152693, lng: 101.9573069898983 } },
    //     { id: 17, name: 'ทางเท O RM', coordinate: { lat: 14.784510118999798, lng: 101.95779667596555 } },
    //     { id: 18, name: 'ถัง M101 RM', coordinate: { lat: 14.784038118313271, lng: 101.95791737537122 } },
    //     { id: 19, name: 'ถัง M102 RM', coordinate: { lat: 14.784187239520183, lng: 101.957966996238 } },
    //     { id: 20, name: 'ถัง M103 RM', coordinate: { lat: 14.784318206756547, lng: 101.95802332262731 } },
    //     { id: 21, name: 'ถัง M104 RM', coordinate: { lat: 14.784096470102085, lng: 101.95775241951681 } },
    //     { id: 22, name: 'ถัง M105 RM', coordinate: { lat: 14.78423521762584, lng: 101.95779801707006 } },
    //     { id: 23, name: 'ถัง M106 RM', coordinate: { lat: 14.784368778242511, lng: 101.95783825020528 } },
    //     { id: 24, name: 'ถัง D101 RM', coordinate: { lat: 14.784175569168545, lng: 101.95756064157224 } },
    //     { id: 25, name: 'ถัง D102 RM', coordinate: { lat: 14.784313019936802, lng: 101.95761160354353 } },
    //     { id: 26, name: 'ถัง D103 RM', coordinate: { lat: 14.784450470618035, lng: 101.95765720109678 } },
    //     { id: 27, name: 'ถัง D104 RM', coordinate: { lat: 14.784241386933328, lng: 101.9573954097371 } },
    //     { id: 28, name: 'ถัง D105 RM', coordinate: { lat: 14.784390270064018, lng: 101.95744934228773 } },
    //     { id: 29, name: 'ถัง D106 RM', coordinate: { lat: 14.784500489917608, lng: 101.9574788465869 } },
    //     { id: 30, name: 'ถัง D107 RM', coordinate: { lat: 14.78511872361861, lng: 101.95764140858196 } },
    //     { id: 31, name: 'ถัง D108 RM', coordinate: { lat: 14.785315821950093, lng: 101.95770846380734 } },
    //     { id: 32, name: 'ถัง D109 RM', coordinate: { lat: 14.78504351499759, lng: 101.9578814662888 } },
    //     { id: 33, name: 'ถัง D110 RM', coordinate: { lat: 14.785244503495539, lng: 101.9579510818418 } },
    //     { id: 34, name: 'ถัง D111 RM', coordinate: { lat: 14.784970899752565, lng: 101.9581307898458 } },
    //     { id: 35, name: 'โรงขยะ AM', coordinate: { lat: 14.785208195909693, lng: 101.95717055901846 } },
    //     { id: 36, name: 'โรงไม้ AM', coordinate: { lat: 14.78319392371295, lng: 101.95855091096577 } },
    //     { id: 37, name: 'หอพัก 1 AM', coordinate: { lat: 14.783435111942985, lng: 101.95862601281819 } },
    //     { id: 38, name: 'หอพัก 2 AM', coordinate: { lat: 14.7828593718535, lng: 101.95839266063389 } },
    //     { id: 39, name: 'อสร. F6', coordinate: { lat: 14.783437705363367, lng: 101.9572232175034 } },
    //     { id: 40, name: 'ลานจอดรถส่วนบุคคล AM', coordinate: { lat: 14.78229615671265, lng: 101.95778142083199 } },
    //     { id: 41, name: 'ลานจอดรถวัตถุดิบ AM', coordinate: { lat: 14.782428506886074, lng: 101.95658612274777 } },
    //     // { id: 42, name: 'อื่นๆ', coordinate: { lat: 0, lng: 0 } },
    // ]
