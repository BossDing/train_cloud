export const transQuestion = (data) => {
	return data.map(x => {
		let {
			a,
			b,
			c,
			d,
			e,
			f,
			...rest
		} = x
		let items = [
			{key: 'A', value: a, checked: true}, 
			{key: 'B', value: b, checked: false}, 
			{key: 'C', value: c, checked: false}, 
			{key: 'D', value: d, checked: false}, 
			{key: 'E', value: e, checked: false}, 
			{key: 'F', value: f, checked: false},
		].filter(t => t.value)
		return {
			...rest,
			items
		}
	})
}