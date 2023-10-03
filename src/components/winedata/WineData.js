import React, { useEffect, useState } from 'react'
import wineDetails from './WineData.json';

export default function WineData() {
    const [classes, setClasses] = useState([]);

    // Function to calculate the mean of an array of numbers
    function calculateMean(numbers) {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, val) => acc + val, 0);
        return sum / numbers.length;
    }

    // Function to calculate the median of an array of numbers
    function calculateMedian(numbers) {
        if (numbers.length === 0) return 0;
        const sortedNumbers = numbers.slice().sort((a, b) => a - b);
        const middle = Math.floor(sortedNumbers.length / 2);

        if (sortedNumbers.length % 2 === 0) {
            const left = sortedNumbers[middle - 1];
            const right = sortedNumbers[middle];
            return (left + right) / 2;
        } else {
            return sortedNumbers[middle];
        }
    }

    // Function to calculate the mode of an array of numbers
    function calculateMode(numbers) {

        if (numbers.length === 0) return [];

        const frequencyMap = new Map();
        let maxFrequency = 0;

        for (const number of numbers) {
            const frequency = (frequencyMap.get(number) || 0) + 1;
            frequencyMap.set(number, frequency);
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
            }
        }

        let mode = null;
        for (const [number, frequency] of frequencyMap) {
            if (frequency === maxFrequency) {
                mode = number;
            }
        }
        return mode;
    }

    // Function to calcutate the summation of mean median and mode based on class( Alcohal)
    function calculateClassStatistics(dataset) {
        const classStatistics = {};

        for (const data of dataset) {
            const { Alcohol, Flavanoids } = data;
            if (!classStatistics[Alcohol]) {
                classStatistics[Alcohol] = [];
            }
            classStatistics[Alcohol].push(Flavanoids);
        }
        const newData = [];
        for (const className in classStatistics) {
            const flavanoidsData = classStatistics[className];

            const mean = calculateMean(flavanoidsData);
            const roundedMean = mean.toFixed(3);

            const median = calculateMedian(flavanoidsData);
            const roundedMedian = median.toFixed(3);

            const mode = calculateMode(flavanoidsData);
            const roundedMode = mode.toFixed(3);

            const data = { class: className, mean: roundedMean, median: roundedMedian, mode: roundedMode };
            newData.push(data);
        }
        setClasses(newData);
    }
    useEffect(() => {
        calculateClassStatistics(wineDetails);
    }, [])

    return (
        <div>
            <h4>Class-wise mean, median, mode of
                “Flavanoids” for the entire dataset.</h4>
            <table striped bordered hover>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {classes.map((wine, index) => (
                            <th>Class {wine.class}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mean</td>
                        {classes.map((wine, index) => (
                            <>
                                <td>{wine.mean}</td>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td>Median</td>
                        {classes.map((wine, index) => (
                            <>
                                <td>{wine.median}</td>
                            </>
                        ))}
                    </tr>
                    <tr>
                        <td>Mode</td>
                        {classes.map((wine, index) => (
                            <>
                                <td>{wine.mode}</td>
                            </>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
