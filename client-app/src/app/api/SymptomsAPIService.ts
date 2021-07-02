export default class SymptomsAPIService {
    static addPrediction(patientId, body) {
        return fetch(`http://localhost:8080/addPrediction/${patientId}`,{
            'method':'POST',
             headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    
    }
    static deletePrediction(id) {
        return fetch(`http://localhost:8080/delete/${id}`,{
            'method':'Delete',
             headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json())
    
    }
}