export const transQuestion = (data) => {
	return data.map(x => {
		let {
			a,
			b,
			c,
			d,
			e,
			f,
			answer,
			...rest
		} = x
		let items = [
			{key: 'A', value: a, checked: false}, 
			{key: 'B', value: b, checked: false}, 
			{key: 'C', value: c, checked: false}, 
			{key: 'D', value: d, checked: false}, 
			{key: 'E', value: e, checked: false}, 
			{key: 'F', value: f, checked: false},
		].filter(t => t.value)
		answer = answer.split('')
		return {
			...rest,
			answer,
			items
		}
	})
}