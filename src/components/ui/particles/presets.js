export function network() {
	return {
		background: {
			opacity: {
				value: "0"
			}
		},
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: {
					enable: false,
					mode: "push"
				},
				onHover: {
					enable: true,
					mode: "repulse"
				},
				resize: true
			},
			modes: {
				push: {
					quantity: 4
				},
				repulse: {
					distance: 200,
					duration: 0.4
				}
			}
		},
		particles: {
			links: {
				distance: 150,
				enable: true,
				opacity: 0.5,
				width: 1
			},
			move: {
				direction: "none",
				enable: true,
				outModes: {
					default: "bounce"
				},
				random: false,
				speed: 1,
				straight: false
			},
			number: {
				density: {
					enable: true,
					area: 800
				},
				value: 300
			},
			opacity: {
				value: 0.5
			},
			shape: {
				type: "square"
			},
			size: {
				value: { min: 1, max: 1 }
			}
		},
		detectRetina: true
	};
}

export function stars() {
	return {
		background: {
			opacity: {
				value: "0"
			}
		},
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: {
					enable: false,
					mode: "push"
				},
				onHover: {
					enable: true,
					mode: "repulse"
				},
				resize: true
			},
			modes: {
				push: {
					quantity: 4
				},
				repulse: {
					distance: 200,
					duration: 0.4
				}
			}
		},
		particles: {
			stars: {
				distance: 150,
				enable: true,
				opacity: 0.5,
				width: 1
			},
			move: {
				direction: "none",
				enable: true,
				outModes: {
					default: "bounce"
				},
				random: false,
				speed: 1,
				straight: false
			},
			number: {
				density: {
					enable: true,
					area: 800
				},
				value: 300
			},
			opacity: {
				value: 0.5
			},
			shape: {
				type: "circle"
			},
			size: {
				value: { min: 1, max: 1 }
			}
		},
		detectRetina: true
	};
}
