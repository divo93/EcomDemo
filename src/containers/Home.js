
import React, {Component} from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
// import axios from 'axios'
// import {API_ENDPOINT} from '../../apiConstant'
import file from './file.json'
import _ from 'lodash'


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      product_list: [],
      cart:[],
      selected:{},
    }
  }
  componentDidMount = () => {
    // axios.get(API_ENDPOINT)
    // .then(res => {
    //   let data = res.data
    //   console.log("data ", res.data)
    //   // for(var i in res.data.json()){
      //   console.log("iiii ", i)
      // }
      file.data.products.map((product) => product.open = false)
      this.setState({product_list:file.data.products})
      
    // })
    // .catch(err => alert(err));
  }


  toggleProductBuy = (index) => {
    let product_list = this.state.product_list
    product_list[index]['open'] = !product_list[index]['open']
    this.setState({product_list})
  }
 
  AddToCart = (index) => {
    this.toggleProductBuy(index)
    let { cart } = this.state
    cart && cart.length < 5 ?
      this.setState({cart:[...this.state.cart, this.state.selected]}) :
    alert("Only Add 5 Products at a time.")
  }

  onChange = (e, index) => {
    let product_list = this.state.product_list
    this.setState({
      selected:{
        ...this.state.selected,
        [e.target.name]:[e.target.value],
        // 'image': product_list[index][searchImage]
      }
    })
  }

  render(){
    let { product_list, cart } = this.state
    console.log("selected ", this.state.selected)
    return (
     <>
     {
        cart && cart.length > 0 ?
          <div style={{marginLeft:'20px'}}>
              <h4 style={{textAlign:'center'}}>Ordered Product List</h4>
              <h5 className='float-right'>Total Amount</h5>
            <div className="row">
            {
              cart.map((p,index) => 
              (<Cart 
                key={index}
                data={p}
                index={index}  
              />))
            }
            </div> 
          </div> : null
      }
     <div className='row' style={{marginLeft:'20px'}}> 
      {
        Array.isArray(product_list) && product_list.length > 0 ?
        product_list.map((product, index) => (
          <ProductList 
            key={index}
            product={product}
            index={index}
            toggleProductBuy={this.toggleProductBuy}
            AddToCart={this.AddToCart}
            onChange={this.onChange}
          /> 
        )) : null
      }
      </div>
      </>   
    )
  }
}

const ProductList = (props) => {
  let {product} = props
  return (
    <Card style={{ width: '18rem', marginLeft: '10px'}}>
       <Card.Img variant="top" src={product.searchImage} style={{width:'100%', height:'300px'}}/>
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">INR {product.mrp}</Card.Subtitle>
        <Card.Text>
          Sizes: {product.sizes}
        </Card.Text>
        <Card.Link><SingleProductModal {...props}/></Card.Link>
      </Card.Body>
    </Card>
  )
}

const SingleProductModal = (props) => {
  let {product, index} = props
  let options =  product && product.inventoryInfo && product.inventoryInfo.length > 0 ?
  product.inventoryInfo.map((inventory, i) => {
    if (inventory.available) {
      return (<option key={i} value={inventory.skuId}>{inventory.label}</option>)
    }
  }) : null
  return (
    <>    
    <Button variant="primary" onClick={() => props.toggleProductBuy(index)}>
      Buy
    </Button>
    <Modal show={product.open} style={{width:'100%'}} >
      <Card style={{ width: '100%'}}>
        <Card.Img variant="top" src={product.searchImage} style={{width:'100%', height:'500px'}}/>
      </Card>
      <Modal.Footer>
        <select onClick={(e) => {props.onChange(e,index)}} name="selected_product"> 
          {options}
        </select>
        <input 
          type="text" 
          placeholder="Enter Quantity" 
          onClick={(e) => props.onChange(e,index)}
          name="selected_size"
        />
        <Button onClick={() => props.AddToCart(index)}> </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

const Cart = (props) => {
  console.log("props ", props)
  return(
    <Card style={{ width: '18rem', marginLeft: '10px'}}>
       <Card.Img variant="top" style={{width:'100%', height:'300px'}}/>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">INR</Card.Subtitle>
        <Card.Text>
          Sizes: 
        </Card.Text>
        <Card.Link href='#'>Remove</Card.Link>
      </Card.Body>
    </Card>
  )
}