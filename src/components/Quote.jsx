import React, { Fragment, useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import axios from 'axios';

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
				const result = await axios(
					'https://quote-garden.herokuapp.com/quotes/random'
				);
				setQuote(result.data);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const handleClick = async () => {
		const res = await axios.get(
			'https://quote-garden.herokuapp.com/quotes/random'
		);
		setQuote(res.data);
		setIsLoading(false);
	};

	return (
		<Fragment>
			{isError && <div>Something went wrong...</div>}
			{isLoading && <p id='loading'>Loading...</p>}

			{!isLoading && (
				<div id='quote-box'>
					<p id='text'>
						<span>"</span>
						{quote.quoteText}
						<span>"</span>
					</p>
					{quote.quoteAuthor ? (
						<p id='author'>- {quote.quoteAuthor} -</p>
					) : (
						<p id='author-anonymous'>- Anonymous -</p>
					)}
					<button id='new-quote' onClick={handleClick}>
						New Quote
					</button>
					<a
						href={`https://twitter.com/intent/tweet?text="${quote.quoteText}"%20-%20${quote.quoteAuthor}`}
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
