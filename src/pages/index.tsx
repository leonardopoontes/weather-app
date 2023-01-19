import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Paper, TextInput, Button, Group, Text } from '@mantine/core'
import { useState } from 'react'

const API_KEY = "e463969ecd4f4975f0c0b6a626e8b3f9";


export default function Home() {
  const [cityInput, setCityInput ] = useState('');

  const [weatherData, setWeatherData] = useState<any>({}); 

 

  async function getWeatherData() {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    try {
      const serverResponse = await  fetch("https://api.openweathermap.org/data/2.5/weather?" + "q=" + cityInput + "&appid=" + API_KEY +
      "&units=imperrial"
      )
      const data = await serverResponse.json();
      console.log(data);
      if(data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }

    
  };
  
  return (
    <div style={{
      position:'static',
      height:'100vh',
      backgroundImage: "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
      backgroundSize: "cover"
    }}>

      <div style={{
        position: "absolute",
        left: "40%",
        top: "50%",
        transform: "transslate(-50%, -50%)"

      }}>
        <Paper withBorder p="lg" style={{maxWidth: "500px"}}>
          <Group position='apart'>
            <Text size='xl' weight={500}>
              Get the Weather
            </Text>
          </Group>
          <Group position='apart'>
            <Text size='lg' >
              Enter a city, and get the weather below
            </Text>
          </Group>
          <Group position='apart' mb="xs">
            <TextInput 
              label="Nome Da Cidade:"
              placeholder='Ex: Fortaleza'
              onChange={(e) => setCityInput(e.target.value)}
            />
          </Group>
          <Group position='apart'>
            <Button variant='gradient' size='md' onClick={() => getWeatherData()}>
              Ver Temperatura
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 ? 
          <>
          <Group position='left'>
            <Text>
            Temperatura em {weatherData.name}
            </Text>
          </Group>
          <Group position='left'>
            <img src={'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + "@4x.png"} width="80px" height="80px" />

            <Text size="lg" weight={500}>
              Atualmente a temperatura é: {(weatherData.main.temp - 273.15).toFixed()} ºC
            </Text>
          </Group>
          </> 
          :null
        }
        </Paper>
      </div>
      

    </div>
  )
}
