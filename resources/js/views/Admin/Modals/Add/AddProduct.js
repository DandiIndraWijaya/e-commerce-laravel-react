import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormLabel } from '@material-ui/core';

const StyledAddProduct = styled.div`
    background-color: white;
    padding: 20px;
    width: 100%;
`;

const useStyles = makeStyles({
    root: {
        minWidth: 400
    },
    input: {
        marginTop: 20
    }
})

const AddProduct = () => {
    const classes = useStyles();
    const [images, setImages] = useState([]);
    
    const fileSelectedHandler = (e) => {
        setImages(e.targer.files)
    }

    return (
        <div className="content">
            <div className="container">
                <StyledAddProduct>
                    <center>
                        <h3>Add a Product</h3>
                        <hr />
                        <form >
                        <TextField type="text" placeholder="Product Name" required />
                        <br />
                        <TextField className={classes.input} type="number" placeholder="Price" required />
                        <br />
                        <FormLabel className={classes.input}>
                            Images:
                        </FormLabel>
                        <br />
                        <input type="file" multiple onChange={fileSelectedHandler} />
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
                            data="<p>Hello from CKEditor 5!</p>"

                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( data );
                            } }
                        />
                        </form>
                    </center>
                    <br />
                    <br />
                </StyledAddProduct>
            </div>
        </div>
    )
}

export default withRouter(AddProduct);

