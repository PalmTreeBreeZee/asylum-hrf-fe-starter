import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState(testData);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    // This is to retrieve the data from the fiscalSummary endpoint

    try {
      const res = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary');
      return res.data
    } catch (err) {
      console.log(err);
    }

  };

  const getCitizenshipResults = async () => {
    // This is to retrieve the data from the citizenshipSummary endpoint

    try {
      const res = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary');
      return res.data
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    //This is to fetch all the required data and set it to the graphData state
    try {
  
    //I am going to have to combine the tack the citizenshipResults onto the fiscalData 
     let mockCitizens = await getCitizenshipResults()
     let fiscal = await getFiscalData()
     let citizens = []
     let i = 0
  
    //This is to make sure that I am grabbing all of the essencial categories  
     mockCitizens.forEach(element => {
        const {
          adminClosed, 
          asylumTerminated, 
          citizenship,
          closedNacaraGrant,
          denied,
          granted,
          totalCases
           } = element
        
         citizens[i] = {   
          adminClosed, 
          asylumTerminated, 
          citizenship,
          closedNacaraGrant,
          denied,
          granted,
          totalCases}
        i++
     });
   
    //This is to combine my data and create a new category
     const combinedData = {
      ...fiscal, citizenshipResults: citizens
    } 
    setGraphData(combinedData)
      
    } catch (err) {
      console.log(err);
    }
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}