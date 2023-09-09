import React, { createContext, useContext, useState } from 'react'
import { ethers } from 'ethers'
import contAddress from '../artifacts/contractAddress.json'
import contractAbi from '../artifacts/abi.json'

const StateContext  = createContext()

export const ContextProvider = ({children}) => {
    const [address, setAddress] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [tasks, setTasks] = useState([])

    let {ethereum} = window
    const contractAddress = contAddress.address
    let tx
    
    const connectWallet  = async() => {
        try {
            if(!ethereum) return alert('plz install metamask')
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            setAddress(accounts[0]?.toLowerCase())
            return true
        } catch (error) {
            console.log(error)
        }  
    }

    const isWallectConnected = async () => {
        try {
          if (!ethereum) return alert('Please install Metamask')
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          setAddress( accounts[0]?.toLowerCase())
      
          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
          })
      
          window.ethereum.on('accountsChanged', async () => {
            setAddress( accounts[0]?.toLowerCase())
            await isWallectConnected()
          })
      
          if (accounts.length) {
            setAddress( accounts[0]?.toLowerCase())
          } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
          }
        } catch (error) {
          console.log(error)
        }
      }

    const getContract = async() => {
        if (address) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        
            return contract
        } else {
            console.log('plz connect wallet')
         }
    }

    const addTodoItem = async(task) => {
        if(!ethereum) return ('plz install metamsk') 
        const contract = await getContract()
        tx = await contract.addTodoItem(task)
        await tx.wait()
        await getTodo()
        
    }
    
    const getTodo = async() => {
        if (address) {
            const contract = await getContract()
            const userTodoItems = await contract.getTodoItems()
            setTasks(userTodoItems)
            const completed = userTodoItems.filter(item => item.completed);
            const incomplete = userTodoItems.filter(item => !item.completed);
    
            setCompletedTasks(completed);
            setIncompleteTasks(incomplete);  
        } 
    }

    const itemComplete = async(id) => {
        if (address) {
            const contract = await getContract()
            const complete = await contract.markTodoItemCompleted(id)
            await complete.wait()
            
        }
    } 




  

    return(
        <StateContext.Provider 
            value={{ connectWallet, tasks, address, setAddress, itemComplete, getTodo,
                incompleteTasks, addTodoItem, completedTasks, isWallectConnected }}
        >
            {children}
        </StateContext.Provider>        
    ) 
}

export const useStateContext = () => useContext(StateContext)