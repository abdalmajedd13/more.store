import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
    if (success) {
      navigate('/productlist');
    }
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create New Product</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="text"
            placeholder="Enter image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="imageFile">Image File</label>
          <input
            type="file"
            id="imageFile"
            label="Choose Image"
            onChange={uploadFileHandler}
          ></input>
          {loadingUpload && <LoadingBox></LoadingBox>}
          {errorUpload && (
            <MessageBox variant="danger">{errorUpload}</MessageBox>
          )}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="countInStock">Count In Stock</label>
          <input
            id="countInStock"
            type="text"
            placeholder="Enter countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
