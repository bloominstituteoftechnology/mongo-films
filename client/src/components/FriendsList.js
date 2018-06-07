import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

const FriendsList = (props) => {


    return (
        <div className="friendslist-container">
            {props.friends.map(e => {
                let { email, phone, facebookUser, ghUser } = e.contact
                return (
                    <Card key={e._id}>
                        <CardImg top width="100%" src={`https://robohash.org/${e.firstName}?size=318x180`} alt="Card image cap" />
                        <CardBody>
                            <CardTitle>{e.firstName} {e.lastName}</CardTitle>
                            <CardText>Age: {e.age}</CardText>
                            <CardText>Joined: {e.createdOn}</CardText>
                            <CardText>{email && email}</CardText>
                            <CardText>{phone && phone}</CardText>
                            <CardText>{ghUser && ghUser}</CardText>
                            <CardText>{facebookUser && facebookUser}</CardText>
                            <button type="button" onClick={() => props.delete(e._id)}>DELETE</button>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    )
}

export default FriendsList