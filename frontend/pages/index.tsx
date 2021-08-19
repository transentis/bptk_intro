import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

import { IconButton, Tooltip } from '@material-ui/core/'

import { PlayArrow, Refresh } from '@material-ui/icons'

import BPTKApi from '@transentis/bptk-connector'
import {
	TabsButtonMenu,
	TabsButtonMenuItem,
	AreaChart,
	FullScreenGridLayout,
	DefaultGraphColors,
	ResponsiveDoubleRangeSlider as DoubleSlider,
	ThemeToggle,
	ResponsiveSingleRangeSlider as SingleSlider,
	Dropdown,
	DropdownItem,
} from '@transentis/bptk-widgets'

import { equations } from '../lib/equations.tabs.map'
import { defaultModel } from '../lib/btpk.models'
import { useRouter } from 'next/router'

import { ScenarioMap } from '@transentis/bptk-connector/dist/types'

const bptkApi = new BPTKApi({
	backendUrl:
		process.env.NEXT_PUBLIC_BACKEND_URL == undefined
			? 'http://localhost:5000'
			: process.env.NEXT_PUBLIC_BACKEND_URL,
	apiKey: 'MY API KEY',
	trailingSlash: false,
})

interface Props {
	data: any
	scenarios: Array<ScenarioMap>
}

const Home = (props: Props) => {
	const { data, scenarios } = props

	const router = useRouter()

	const isFirstRun = useRef(true)

	const graphs = [equations.customers, equations.customerAcquisition]

	// Range for the slider for the graph
	const [rangeSliderRange, setRangeSliderRange] = useState<number[]>([0, 60])

	// Selected Graph
	const [selectedGraph, setSelectedGraph] = useState<{
		name: string
		equations: Array<string>
	}>(graphs[0])
	const [graphData, setGraphData] = useState<any>(data)

	const defaultWordOfMouthSuccess =
		defaultModel().settings.sddsl_customer_acquisition.interactive_scenario
			.constants.word_of_mouth_success

	const [wordOfMouthSliderData, setWordOfMouthSliderData] = useState(
		defaultWordOfMouthSuccess,
	)

	const [scenario, setScenario] = useState(scenarios[0])

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}
		requestData()
	}, [scenario])

	const requestData = async () => {
		const model = defaultModel(scenario.manager, scenario.name, undefined, {
			sddsl_customer_acquisition: {
				interactive_scenario: {
					constants: {
						word_of_mouth_success: wordOfMouthSliderData,
					},
				},
			},
		})
		const requestedData = await bptkApi.requestModel(model)

		if (!requestedData) {
			return
		}

		setGraphData(
			bptkApi.chartifyData(
				requestedData[model.scenario_managers[0]][model.scenarios[0]]
					.equations,
			),
		)
	}

	const handleSliderChange = (newValue: number[]) => {
		setRangeSliderRange(newValue as number[])
	}

	const handleGraphChange = (index: number) => {
		setSelectedGraph(graphs[index])
	}

	return (
		<div className='text-base-content min-h-screen'>
			<Head>
				<title>Customer Acquisition</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='h-full w-full'>
				<FullScreenGridLayout
					dashboardTitle={'Customer Aquisition'}
					logoDivCSS='logoDiv'
					titleSidePanelComponent={
						<ThemeToggle
							lightTheme='transentisLight'
							darkTheme='transentisDark'
						/>
					}
					graphTabsComponent={
						<div className='flex flex-row justify-center items-center text-cyan-dark'>
							<Dropdown variant='primary' name='Scenarios' hover>
								{scenarios.map((scenario, index) => (
									<DropdownItem
										name={scenario.displayName}
										onClick={() => setScenario(scenario)}
										key={index}
									></DropdownItem>
								))}
							</Dropdown>
							<div className='p-4'>
								<TabsButtonMenu
									className=''
									style='boxed'
									defaultSelectedIndex={0}
									onChange={(num) => handleGraphChange(num)}
								>
									{graphs.map((mapEquatios, index) => (
										<TabsButtonMenuItem
											name={mapEquatios.name.toLocaleUpperCase()}
											key={index}
										/>
									))}
								</TabsButtonMenu>
							</div>
						</div>
					}
					graphTitle={selectedGraph.name
						.toUpperCase()
						.replace('_', ' ')}
					graphComponent={
						<AreaChart
							curve={'cardinal'}
							enablePoints={false}
							enableGridX={false}
							enableGridY={false}
							enableSlices={'x'}
							xScale={{
								type: 'linear',
								min: 'auto',
								max: 'auto',
								reverse: false,
							}}
							axisLeft={{
								tickSize: 2,
							}}
							data={bptkApi.reduceDataWithEquationsInRange(
								graphData,
								selectedGraph.equations,
								rangeSliderRange[0],
								rangeSliderRange[1],
							)}
						></AreaChart>
					}
					graphSettingComponent={
						<>
							<p className=''>Visualization Range</p>
							<DoubleSlider
								onChange={handleSliderChange}
								min={0}
								max={60}
								startMin={0}
								startMax={60}
							/>
						</>
					}
					sidePanelComponent={<div></div>}
					graphSettingsBox={
						scenario.name === 'interactive_scenario' ? (
							<div className='w-full h-full relative m-2 p-2'>
								<div className='absolute right-2 top-2'>
									<Tooltip title={'Resets the dragchart'}>
										<IconButton
											style={{ color: '#009696' }}
											onClick={() => {
												setWordOfMouthSliderData(
													defaultWordOfMouthSuccess,
												)
												requestData()
											}}
											aria-label='reset'
										>
											<Refresh />
										</IconButton>
									</Tooltip>

									<Tooltip
										title={
											'Runs the Model with the new dragchart data'
										}
									>
										<IconButton
											style={{ color: '#009696' }}
											onClick={() => {
												requestData()
											}}
											aria-label='run'
										>
											<PlayArrow />
										</IconButton>
									</Tooltip>
								</div>
								<p>Word of mouth success</p>

								<div className='w-11/12 h-full m-2'>
									<SingleSlider
										min={0}
										max={1}
										startValue={defaultWordOfMouthSuccess}
										step={0.1}
										onChange={(newValue) =>
											setWordOfMouthSliderData(newValue)
										}
									/>
								</div>
							</div>
						) : (
							<div />
						)
					}
				></FullScreenGridLayout>
			</div>
		</div>
	)
}

export const getStaticProps = async () => {
	const dashboardConfig = await import('../lib/dashboard.config.json')

	const scenarios = await bptkApi.getScenarios()
	const mappedScenarios = bptkApi.scenarioEncoder(
		// @ts-ignore
		scenarios.sddsl_customer_acquisition,
		dashboardConfig,
	)

	const model = defaultModel(
		mappedScenarios[0].manager,
		mappedScenarios[0].name,
	)
	// Request Model Data for the Dashboard
	const requestedData = await bptkApi.requestModel(model)

	// If there was a problem retreiving the Data show a not found/error page
	if (!requestedData) {
		return {
			notFound: true,
		}
	}

	// Convert the data to be easily used in graphs => set them as props for the page
	const data = bptkApi.chartifyData(
		requestedData[model.scenario_managers[0]][model.scenarios[0]].equations,
	)

	return {
		props: {
			data: data,
			scenarios: mappedScenarios,
		},
	}
}

export default Home
