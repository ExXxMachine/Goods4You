import React, { useState } from 'react'
import classes from './FAQ.module.css'

interface FAQItemProps {
	question: string
	answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<section className={classes.faqItem}>
			<div
				className={classes.faqQuestion}
				onClick={toggleOpen}
				role='button'
				aria-expanded={isOpen}
				aria-label={`Toggle answer for ${question}`}
			>
				<h3>{question}</h3>
				<span className={`${classes.icon} ${isOpen ? classes.open : ''}`}>
					{isOpen ? '×' : '+'}
				</span>
			</div>
			<div className={`${classes.faqAnswer} ${isOpen ? classes.open : ''}`}>
				<p>{answer}</p>
			</div>
		</section>
	)
}

const FAQ = () => {
	const faqData = [
		{
			question: 'How can I track the status of my order?',
			answer:
				'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.',
		},
		{
			question: 'What payment methods do you accept?',
			answer:
				'We accept various payment methods, including credit cards, debit cards, and PayPal.',
		},
		{
			question: 'How can I return or exchange an item?',
			answer:
				'You can return or exchange an item by following the instructions in our return policy, which is available on our website.',
		},
	]

	return (
		<div className={classes.faq}>
			<a id='FAQ' className={classes.faqTitle}>
				<h2>FAQ</h2>
			</a>
			{faqData.map((item, index) => (
				<FAQItem key={index} question={item.question} answer={item.answer} />
			))}
		</div>
	)
}

export { FAQ }
