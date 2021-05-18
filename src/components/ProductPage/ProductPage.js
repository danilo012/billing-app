import { Box, Container, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncDeleteProducts } from '../../action/productAction'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import ProductDetails from './ProductDetails'
import ProductTable from './ProductTable'

const useStyle = makeStyles({
    container: {
        width: '90vw',
        padding: '2vh 1vw'
    },
    title:{
        fontWeight: '700'
    },
    pageContent: {
        marginTop: '175px',
        width: '90vw'
    },
    formContainer: {
        position: 'fixed'
    },
    detailSection: {
        position: 'fixed',
        right: '75px'
    },
    divider:{
        width: '90vw'
    }
})

const ProductPage = (props) => {
    const products = useSelector(state => state.products)
    const classes = useStyle()
    const dispatch = useDispatch()
    const [ updateProd, setUpdateProd ] = useState({})
    const [ viewProduct, setViewProduct ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ productList, setProductList ] = useState(products)


    useEffect(() => {
        setProductList(products)
    }, [products])

    // useEffect(() => {
    //     dispatch(asyncGetProducts())
    // }, [])

    // update product related functions
    const handleUpdateProd = (data) => {
        setUpdateProd(data)
    }

    const resetUpdateProd = () => {
        setUpdateProd({})
    }

    //view product related functions
    const handleViewProduct = (data) => {
        setViewProduct(data)
    }
    
    const resetViewProduct = () => {
        setViewProduct('')
    }

    //deleting product functions
    const handleDeleteProduct = (id) => {
        dispatch(asyncDeleteProducts(id))
    }

    //search related functions
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        filterProducts(e.target.value)
    }

    const resetSearch = () => {
        setSearch('')
        filterProducts('')
    }

    const filterProducts = (value) => {
        if(value.length > 0) {
            const filteredProduct = products.filter(prod => prod.name.toLowerCase().includes(value.toLowerCase()))
            setProductList(filteredProduct)
        } else {
            setProductList(products)
        }
    }

    return (
        <Container className={classes.container}>
            <Container disableGutters className={classes.formContainer}>
                <Typography className={classes.title} variant='h3'>Products</Typography>
                {
                    Object.keys(updateProd).length > 0 ? (
                        <EditProduct updateProd={updateProd} resetUpdateProd={resetUpdateProd} />
                    ) : (
                        <AddProduct />
                    )
                }
                <Divider className={classes.divider} />
            </Container>
            <Grid className={classes.pageContent} container disableGutters>
                <Grid item lg={8}>
                    <Box 
                        disableGutters 
                        display='flex' 
                        flexDirection='row' 
                        alignItems='baseline' 
                        justifyContent='space-between'
                    >
                        <Typography variant='h5'>List of Products - {products.length} </Typography>
                        <TextField 
                            variant='outlined' 
                            margin='dense' 
                            label='search product'
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Box>
                    <ProductTable 
                        products={productList}
                        resetSearch={resetSearch}
                        handleDeleteProduct={handleDeleteProduct} 
                        handleViewProduct={handleViewProduct}
                        handleUpdateProd={handleUpdateProd}
                    />
                </Grid>
                <Grid className={classes.detailSection} item lg={4} >
                    <ProductDetails 
                        productId={viewProduct} 
                        resetViewProduct={resetViewProduct} 
                        handleUpdateProd={handleUpdateProd} 
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductPage