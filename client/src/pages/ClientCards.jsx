import { useParams } from 'react-router-dom'
import React, {useState, useEffect} from "react";
import CardItem from "../components/CardItem";


const ClientCards = () => {
    const { id } = useParams()
    const [document, setDocument] = useState();
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(formData))
        fetch('http://127.0.0.1:3333/cards', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                documentId: document.id,
                creatorUserId: "cljo9zlyf0002zqb3l0bzk139",
                cardListId: "cljoa2cw70004zqb3ubgcq41u"

            })

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
        fetch(`http://127.0.0.1:3333/docs/${id}/cards`)
        .then((response) => response.json())
        .then((data) => {
            setDocument(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.message);
         });
    }, [isLoading])


    return (
        <div>
        <div className='master-card'>
        <h1>{document && document.name}</h1>
        </div>
        <div className="page-title">
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" className="form-control" placeholder="Nome" value={formData.name} onChange={handleChange} required />
                <textarea id='description' name='description' cols='21' type="text" className="form-control" placeholder="Descrição" value={formData.description} onChange={handleChange} />
                <button type="submit">Adicionar outro Card</button>
            </form>
            </div>
        <div className="trello">
            {document && document.cards.map((card) => {
                return (
                    <div style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <CardItem key={card.id} title={card.name} content={card.description} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                    </div>
                )
            })}
        </div>
        </div> 

    )
}




export default ClientCards;