

import React from 'react'
import { Card, Button} from 'react-bootstrap'

export const Cart = (props) => {
    let { data, index } = props
    return(
      <Card style={{ width: '18rem', marginLeft: '10px'}}>
         <Card.Img variant="top" src={data.image} style={{width:'100%', height:'300px'}}/>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">INR &nbsp;{data.price}</Card.Subtitle>
            <ul>
              <li>Size: {data.size}</li>
              <li>Number of Items: {data.qty}</li>
            </ul> 
          <Button onClick={() => props.removeItemFromCart(index)}>Remove</Button>
        </Card.Body>
      </Card>
    )
  }