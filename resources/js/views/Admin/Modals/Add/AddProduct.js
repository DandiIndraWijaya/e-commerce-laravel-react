import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, FormLabel, Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 400
    },
    input: {
        marginTop: 20
    },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const StyledAddProduct = styled.div`
    background-color: white;
    padding: 20px;
    width: 100%;
`;


const AddProduct = () => {
    
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [subcategoryId, setSubcategoryId] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        axios.get('/api/category')
        .then(response => {
            setCategory(response.data);
            getSubcategory(response.data[0].id)
        })
    }, [])

    const getSubcategory = (category_id) => {
        axios.get(`/api/subcategory/${category_id}`)
        .then(response => {
            setSubcategory(response.data)
        })
    }

    const handleOnChangeCategory = (e) => {
        setCategoryId(e.target.value);
        getSubcategory(e.target.value);
    }

    const handleOnChangeSubcategory = (e) => {
        setSubcategoryId(e.target.value);
    }

    const fileSelectedHandler = (e) => {
        let imagesArray = [];

        for( let i = 0 ; i < e.target.files.length ; i++){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[i]);
            fileReader.onload = (e) => {
                imagesArray.push(e.target.result);
                setImages(imagesArray)
            }
        }
    }

    const handleOnSubmit = () => {

        const fd = new FormData();

        for(let i=0 ; i<images.length ; i++){
            fd.append(`images[]`, images[i]);
        }
        
        fd.append('category_id', categoryId);
        fd.append('subcategory_id', subcategoryId);
        fd.append('product_name', productName);
        fd.append('price', price);
        fd.append('description', description);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/product', fd, config)
        .then(response => {
            setSaved(true)
        })
    }

    return (
        <div className="content">
            <div className="container">
                <StyledAddProduct>
                    <center>
                        <h3>Add a Product</h3>
                        <hr />
                        
                        <form >
                        <TextField type="text" placeholder="Product Name" required onChange={(e) => {
                            setProductName(e.target.value);
                        }} />
                        <br />
                        <TextField className={classes.input} type="number" placeholder="Price" required onChange={e => {
                            setPrice(e.target.value);
                        }} />
                        <br />
                        <FormLabel className={classes.input}>
                            Images:
                        </FormLabel>
                        <br />


                        <input type="file" multiple onChange={fileSelectedHandler} />

                        <br />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleOnChangeCategory}
                            >
                            {
                                category.map((c, key) => {

                                    return <MenuItem key={key} value={c.id}>{c.category}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>

                        <br />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleOnChangeSubcategory}
                            >
                            {
                                subcategory.map((c, key) => {

                                    return <MenuItem key={key} value={c.id}>{c.subcategory}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>
                        <br />

                        <FormLabel className={classes.input}>
                            Description:
                        </FormLabel>
                        <br />
                        <br />
                        <CKEditor
                            className={classes.input}
                            editor={ ClassicEditor }
                            config={{
                                removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                              }}
                              
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data);
                            } }
                        />
                        </form>
                    </center>
                    <br />
                    <Button onClick={handleOnSubmit} variant="contained" color="primary">Save</Button>
                    {
                        saved && <Alert severity="success">This is a success alert — check it out!</Alert>
                    }
                    <br />
                    <br />
                </StyledAddProduct>
            </div>
        </div>
    )
}

export default withRouter(AddProduct);

