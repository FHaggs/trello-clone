import { useParams } from 'react-router-dom'
import React, {useState, useEffect} from "react";
import CardItem from "../components/CardItem";
import { Link } from "react-router-dom";

const ClientDocs = () => {
    const { id } = useParams()
    const [project, setProject] = useState();
    const [formData, setFormData] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (event) => {
        setFormData(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/docs', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                name: formData,
                projectId: id
            })

        })
        .then(() => {
            setIsLoading(true);
            setFormData("")
        })
        .catch((err) => {
            console.log(err.message);
        })
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:3333/clients/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setProject(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.message);
         });
    }, [isLoading])



    return (
        <div>
            <div className='master-card'>
                <h1>{project && project.name}</h1>
                <p>{project && project.description}</p>
            </div>
            <div className="page-title">
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" className="form-control" placeholder="Nome" value={formData} onChange={handleChange} required />
                <button type="submit">Adicionar outro Documento</button>
            </form>
            </div>
            <div className="trello">
                {project && project.documents.map((doc) => {
                    return (
                        <Link to={`/cards/${doc.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <CardItem key={doc.id} title={doc.name} content={doc.description} />
                        </Link>
                    )
                })}
            </div>
        </div>

    )
}




export default ClientDocs;