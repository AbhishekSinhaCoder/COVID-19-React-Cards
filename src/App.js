import React, { useEffect, useState } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form'
function App() {
  const [latest, setLatest] = useState("");
  const [results, setResults] = useState([]);
  const [Country, setCountry] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
      .then(res => {
        setLatest(res[0].data);
        setResults(res[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const filtercountry = results.filter(item => { return Country !="" ? item.country.includes(Country) : item; });

  const countries = filtercountry.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        style={{ width: '20px',height: '10px' }}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {data.cases}</Card.Text>
          <Card.Text>Deaths: {data.deaths}</Card.Text>
          <Card.Text>Recovered: {data.recovered}</Card.Text>
          <Card.Text>Today's cases: {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths: {data.todayDeaths}</Card.Text>
          <Card.Text>Active: {data.active}</Card.Text>
          <Card.Text>Critical: {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div>
      <CardDeck>
        <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {(new Date(parseInt(latest.updated))).toString()}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text={"white"} className="text-center" style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {(new Date(parseInt(latest.updated))).toString()}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text={"white"} className="text-center" style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {(new Date(parseInt(latest.updated))).toString()}</small>
          </Card.Footer>
        </Card>
        <Card bg="warning" text={"white"} className="text-center" style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Affected Countries</Card.Title>
            <Card.Text>
              {latest.affectedCountries}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {(new Date(parseInt(latest.updated))).toString()}</small>
          </Card.Footer>
        </Card>
        <Card bg="info" text={"white"} className="text-center" style={{ margin: "10px" }}>

          <Card.Body>
            <Card.Title>Total Tests</Card.Title>
            <Card.Text>
              {latest.tests}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {(new Date(parseInt(latest.updated))).toString()}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control type="text" placeholder="Enter " onChange={e => setCountry(e.target.value)} />
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  )
}

export default App;
