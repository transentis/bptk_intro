import { equations as eq } from './equations.tabs.map'

export const defaultModel = (
	scenarioManager = 'sddsl_customer_acquisition',
	scenario = 'base',
	equations = [
		...eq.customers.equations,
		...eq.customerAcquisition.equations,
	],
	settings = {
		sddsl_customer_acquisition: {
			interactive_scenario: {
				constants: {
					word_of_mouth_success: 0.5,
				},
			},
		},
	},
) => ({
	scenario_managers: [scenarioManager],
	scenarios: [scenario],
	equations: equations,
	settings: settings,
})
