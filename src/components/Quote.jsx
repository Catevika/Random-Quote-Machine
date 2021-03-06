import React, { Fragment, useState, useEffect } from 'react';

import Spinner from './Spinner';

import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';
import './Quote.scss';

const Quote = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [quote, setQuote] = useState({});
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios('https://favqs.com/api/qotd');
				setQuote(result.data);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const handleClick = async () => {
		const res = await axios.get('https://favqs.com/api/qotd');
		setQuote(res.data);
		setIsLoading(false);
	};

	return (
		<Fragment>
			{isError && <div>Something went wrong...</div>}
			{isLoading && <Spinner />}

			{!isLoading && (
				<div id='quote-box'>
					<p id='text'>
						<span>"</span>
						{quote.quote.body}
						<span>"</span>
					</p>
					{quote.quote.author ? (
						<p id='author'>- {quote.quote.author} -</p>
					) : (
						<p id='author-anonymous'>- Anonymous -</p>
					)}
					<button id='new-quote' onClick={handleClick}>
						New Quote
					</button>
					<a
						href={`https://twitter.com/intent/tweet?text="${quote.quote.body}"%20-%20${quote.quote.author}`}
						id='tweet-quote'
					>
						<i className='fa fa-twitter' /> Send quote to Twitter{' '}
					</a>
				</div>
			)}
		</Fragment>
	);
};

export default Quote;
