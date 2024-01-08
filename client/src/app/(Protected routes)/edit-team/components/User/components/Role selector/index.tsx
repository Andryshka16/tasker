'use client'

import { useState } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { type Role } from '@/types'
import { useOptimistic, useUpdateUser } from '@/hooks'
import { capitalize } from '@/helpers'

interface Props {
	initialRole: Role
	userId: number
}

const RoleSelector = ({ initialRole, userId }: Props) => {
	const [open, setOpen] = useState(false)
	const [role, setRole] = useOptimistic(initialRole, async (role) => await updateUser({ role }))

	const updateUser = useUpdateUser(userId)

	const options: Role[] = ['user', 'moderator', 'admin']
	options[options.indexOf(role)] = options[0]
	options[0] = role

	const handleSelect = (index: number) => {
		if (open && index) {
			setRole(options[index])
		}
		setOpen((open) => !open)
	}

	const getOptionStyle = (index: number) => {
		const visibility = !open && index > 0 ? 'hidden' : 'visible'

		const colors = {
			admin: 'bg-orange-500',
			moderator: 'bg-purple-600',
			user: 'bg-green-600'
		}
		const color = colors[options[index]]

		let rounded = !open ? 'rounded-md' : ''
		if (open && index === 0) rounded += 'rounded-t-md'
		if (open && index === options.length - 1) rounded += 'rounded-b-md'

		return `flex w-full h-full font-semibold text-xs cursor-pointer items-center justify-center ${color} ${visibility} ${rounded}`
	}

	return (
		<div className='relative h-7 w-32'>
			{options.map((role, index) => (
				<div
					key={index}
					className={getOptionStyle(index)}
					onClick={() => handleSelect(index)}
				>
					{capitalize(role)}
				</div>
			))}
			<TiArrowSortedDown
				size={15}
				className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 duration-200 ${
					open ? 'rotate-180' : ''
				}`}
			/>
		</div>
	)
}

export default RoleSelector
