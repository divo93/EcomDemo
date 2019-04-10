
import React, {Component} from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import file from './file.json'
import {Cart} from './Cart'
import {getProductList} from './action'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      product_list: [],
      cart:[],
      selected:{},
      available_qty:0
    }
  }
  componentDidMount = async () => {
      let res = await getProductList()
      const data = JSON.parse(res.data)
      this.setState({product_list:data.products})
      // file.data.products.map((product) => product.open = false)
      // this.setState({product_list:file.data.products})
  }

  toggleProductBuy = (index) => {
    let product_list = this.state.product_list
    product_list[index]['open'] = !product_list[index]['open']
    this.setState({product_list})
  }
 
  addToCart = (index) => {
    let {selected, cart, available_qty} = this.state
    if (selected && selected.hasOwnProperty('size') && selected.hasOwnProperty('qty')) {
      if (selected.size == ''){
        alert("Select Size Before Adding To Cart")
      }
      else if (selected.qty > available_qty){
        alert (`Only ${available_qty} item(S) can be selected.`)
      } 
      else {
        this.toggleProductBuy(index)
          cart && cart.length < 5 ?
            this.setState({cart:[...cart, selected]}) :
          alert("Only Add 5 Products at a time.")
        } 
      }
    else {
      alert("Select Size and Quantity First.")
    }  
  }

  removeItemFromCart = (index) => {
    let cart = this.state.cart
    delete cart[index]
    this.setState({cart})
  }

  onChange = (e, index) => {
    let product_list = this.state.product_list
    const name = event.target.name
    if (name == 'size'){
      var data = product_list[index]['inventoryInfo'].filter(info => info.label == e.target.value)
      this.setState({available_qty: data[0]['inventory']})
    }
    console.log("data ", data)
    this.setState({
      selected:{
        ...this.state.selected,
        [e.target.name]:e.target.value,
        'image': product_list[index]['searchImage'],
        'price':product_list[index]['price'],
        'name':product_list[index]['productName'],
      }
    })
  }

  render(){
    let { product_list, cart } = this.state
    return (
     <>
     {/* Check if product store in Cart or not */}
     {
      cart && cart.length > 0 ?
        <div style={{marginLeft:'20px'}}>
            <h4 style={{textAlign:'center'}}>Ordered Product List</h4>
            <h5 className='float-right' style={{marginRight:'20px'}}>Total Amount: 
              {cart.reduce((sum, arr) => {
                return sum + parseInt(arr.price * arr.qty)        
              }, 0)}
            </h5>
          <div className="row">
          {
            cart.map((p,index) => 
            (<Cart 
              key={index}
              data={p}
              index={index}  
              removeItemFromCart={this.removeItemFromCart}
            />))
          }
          </div> 
        </div> : null
      }
      <br />
     <div className='row' style={{marginLeft:'20px'}}> 
      {
        Array.isArray(product_list) && product_list.length > 0 ?
        product_list.map((product, index) => (
          <ProductList 
            key={index}
            product={product}
            index={index}
            toggleProductBuy={this.toggleProductBuy}
            addToCart={this.addToCart}
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
        <Card.Subtitle className="mb-2 text-muted">INR {product.price}</Card.Subtitle>
        <Card.Text>
          Sizes: {product.sizes}
        </Card.Text>
        <Card.Link><SingleProductModal {...props}/></Card.Link>
      </Card.Body>
    </Card>
  )
}

//  when user selects a single product. A pop Modal Will Open

const SingleProductModal = (props) => {
  let {product, index} = props
  let options =  product && product.inventoryInfo && product.inventoryInfo.length > 0 ?
  product.inventoryInfo.map((inventory, i) => {
    if (inventory.available) {
      return (<option key={i} value={inventory.label}>{inventory.label}</option>)
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
        <select onClick={(e) => {props.onChange(e,index)}} name="size"> 
          <option value=''>Select Size</option>
          {options}
        </select>
        <input 
          type="text" 
          placeholder="Enter Quantity" 
          onChange={(e) => props.onChange(e,index)}
          name="qty"
        />
        <Button onClick={() => props.addToCart(index)}> Buy </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}


