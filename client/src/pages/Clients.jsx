import React, { useState, useEffect } from "react";
import CardItem from "../components/CardItem";
import { Link } from "react-router-dom";
import '../App.css';





const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/clients', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(formData)

        })
        .then(() => {
            setIsLoading(true);
            setFormData({ name: "", description: "" })

        })
        .catch((err) => {
            console.log(err.message);
        })
    };

useEffect(() => {
    fetch('http://127.0.0.1:3333/clients')
        .then((response) => response.json())
        .then((data) => {
            setClients(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.message);
        });
}, [isLoading])
return (
    <div>
        <div className="page-title">
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" className="form-control" placeholder="Nome" value={formData.name} onChange={handleChange} required />
                <textarea id='description' name='description' cols='21' type="text" className="form-control" placeholder="Descrição" value={formData.description} onChange={handleChange} />
                <button type="submit">Adicionar outro Cliente</button>
            </form>
        </div>

        <div className="trello">
            {clients.map((client) => {
                return (
                    <Link to={client.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <CardItem key={client.id} title={client.name} content={client.description} />
                    </Link>
                )
            })}
        </div>
    </div>

)
}


export default ClientPage;