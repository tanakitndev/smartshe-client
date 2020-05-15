import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import axios from 'axios';
import http from '../configs/http';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotworkSet: [],
			heightworkSet: [],
			confineworkSet: [],

			hotworkCount: 0,
			heightworkCount: 0,
			confineworkCount: 0,
			maximunstack: 6,
			isLoading: false
		}
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	componentDidMount() {
		this.fetchWorkPermitReport();
	}


	fetchWorkPermitReport = async () => {
		this.setState({
			isLoading: true
		});
		const rp = await axios.get(`${http}/api/v1/dashboard/report-chart`);
		const { data, error } = rp.data;

		console.log('report',data);
		

		let hotworkSet = [];
		let heightworkSet = [];
		let confineworkSet = [];
		if (!error) {
			data.forEach(el => {

				let permit_enable = JSON.parse(el.permit_enable);
				console.log('permit_enable',permit_enable);

				let currentDate = new Date(el.created_at).toString().split(" ");

				// Hot
				let existYHotwork = hotworkSet.find(hotwork => {
					return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === hotwork.label
				});


				if (!existYHotwork) {
					hotworkSet.push({
						label: currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1],
						y: permit_enable.hotwork ? 1 : 0,
						permit_enable: permit_enable.hotwork
					});
				} else {
					let existYHotworkIndex = hotworkSet.findIndex(hotwork => {
						return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === hotwork.label
					});
					hotworkSet[existYHotworkIndex].y = hotworkSet[existYHotworkIndex].permit_enable ? hotworkSet[existYHotworkIndex].y + 1 : hotworkSet[existYHotworkIndex].y;
				}

				// Height
				let existYHeightwork = heightworkSet.find(heightwork => {
					return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === heightwork.label
				});

				if (!existYHeightwork) {
					heightworkSet.push({
						label: currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1],
						y: permit_enable.heightwork ? 1 : 0,
						permit_enable: permit_enable.heightwork
					});
					console.log('heightworkSet',heightworkSet);
					
					
				} else {
					let existYHeightworkIndex = heightworkSet.findIndex(heightwork => {
						return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === heightwork.label
					});

					heightworkSet[existYHeightworkIndex].y = heightworkSet[existYHeightworkIndex].permit_enable.heightwork ? heightworkSet[existYHeightworkIndex].y + 1 : heightworkSet[existYHeightworkIndex].y;
					
					// console.log('heightworkSet[existYHeightworkIndex].permit_enable',heightworkSet[existYHeightworkIndex].permit_enable);
				}

				

				// Confine
				let existYConfinework = confineworkSet.find(confinework => {
					return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === confinework.label
				});

				if (!existYConfinework) {
					confineworkSet.push({
						label: currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1],
						y: permit_enable.confinework ? 1 : 0,
						permit_enable: permit_enable.confinework
					});
				} else {
					let existYConfineworkIndex = confineworkSet.findIndex(confinework => {
						return (currentDate[0] + ' ' + currentDate[2] + ' ' + currentDate[1]).toString() === confinework.label
					});
					confineworkSet[existYConfineworkIndex].y = confineworkSet[existYConfineworkIndex].permit_enable ? confineworkSet[existYConfineworkIndex].y + 1 : parseInt(confineworkSet[existYConfineworkIndex].y);
				}


			});
			// console.log('hotworkSet', hotworkSet);
			// console.log('heightworkSet', heightworkSet);
			// console.log('confineworkSet', confineworkSet);
			let hotworkCount = 0;
			for (let i in hotworkSet) {
				hotworkCount += hotworkSet[i].y
			}

			
			
			let heightworkCount = 0;
			for (let i in heightworkSet) {
				heightworkCount += heightworkSet[i].y
			}

			let confineworkCount = 0;
			for (let i in hotworkSet) {
				confineworkCount += confineworkSet[i].y
			}
			// find best stack number
			let stacknumber = hotworkCount >= 6 ? hotworkCount : 6;
			if (hotworkCount < heightworkCount) {
				if (heightworkCount >= 6) stacknumber = heightworkCount;
			} else if (heightworkCount < confineworkCount) {
				if (confineworkCount >= 6) stacknumber = confineworkCount;
			}
			this.setState({
				hotworkSet,
				heightworkSet,
				confineworkSet,
				hotworkCount,
				heightworkCount,
				confineworkCount,
				maximunstack: stacknumber,
				isLoading: false
			});
			// console.log({
			// 	hotworkSet,
			// 	heightworkSet,
			// 	confineworkSet,
			// 	hotworkCount,
			// 	heightworkCount,
			// 	confineworkCount,
			// 	maximunstack: stacknumber,
			// 	isLoading: false
			// });
			
		}
	}

	render() {



		const options = {
			animationEnabled: true,
			exportEnabled: true,
			backgroundColor: '#475468',
			theme: "dark1",
			title: {
				text: null,
				fontFamily: "verdana",
			},
			axisY: {
				title: null,
				prefix: "",
				suffix: "",
				// valueFormatString: "#0"
				maximum: this.state.maximunstack
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: false,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
				{
					type: "stackedColumn",
					name: "Hot",
					showInLegend: true,
					yValueFormatString: "#,###",
					dataPoints: this.state.hotworkSet,
					color: "#fffa65"
					// dataPoints: [
					// 	{ label: "SUN 2", y: 0 },
					// 	{ label: "MON 3", y: 1 },
					// 	{ label: "TUE 4", y: 0 },
					// 	{ label: "WED 29", y: 1 },
					// 	{ label: "THU 30", y: 0 },
					// 	{ label: "FRI 31", y: 1 },
					// 	{ label: "SAT 1", y: 0 },
					// ]
				},
				{
					type: "stackedColumn",
					name: "Height",
					showInLegend: true,
					yValueFormatString: "#,###",
					dataPoints: this.state.heightworkSet,
					color: "#32ff7e"
					// dataPoints: [
					// 	{ label: "SUN 2", y: 0 },
					// 	{ label: "MON 3", y: 1 },
					// 	{ label: "TUE 4", y: 1 },
					// 	{ label: "WED 29", y: 0 },
					// 	{ label: "THU 30", y: 0 },
					// 	{ label: "FRI 31", y: 1 },
					// 	{ label: "SAT 1", y: 1 },
					// ]
				},
				{
					type: "stackedColumn",
					name: "Confine",
					showInLegend: true,
					yValueFormatString: "#,###",
					dataPoints: this.state.confineworkSet,
					color: "#ffb8b8"
					// dataPoints: [
					// 	{ label: "SUN 2", y: 0 },
					// 	{ label: "MON 3", y: 2 },
					// 	{ label: "TUE 4", y: 1 },
					// 	{ label: "WED 29", y: 2 },
					// 	{ label: "THU 30", y: 1 },
					// 	{ label: "FRI 31", y: 1 },
					// 	{ label: "SAT 1", y: 0 },
					// ]
				}]
		}
		return (
			<div>
				<div className="report-title">ข้อมูลสัปดาห์ล่าสุด</div>
				{this.state.isLoading &&
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				}
				<div className="row">
					<div className="col-lg-2">
						<div className="circle-card circle-hotwork d-flex flex-column">
							Hot
							<span>{this.state.hotworkCount}</span>
						</div>
						<div className="circle-card circle-heightwork d-flex flex-column">
							Height
							<span>{this.state.heightworkCount}</span>
						</div>
						<div className="circle-card circle-confinework d-flex flex-column">
							Confine
							<span>{this.state.confineworkCount}</span>
						</div>
					</div>
					<div className="col-lg-10">
						<CanvasJSChart options={options}
							onRef={ref => this.chart = ref}
						/>
					</div>
				</div>

				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default BarChart;