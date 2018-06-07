import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/* Additional Dependencies & Components */
import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Character extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      character: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    axios.get(`http://localhost:5000/api/characters/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ character: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render = () => {
    const { classes, data } = this.props;
    const { name, homeworld, gender, height, hair_color, eye_color, skin_color, birth_year } = this.state.character;
    if (this.state.loading) return <h1>Loading</h1>;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="display1" component="h1">
            {name}
          </Typography>
          <Typography variant="subheading" component="h1">
            {homeworld.name}
          </Typography>
          <br />
          <Typography variant="title" component="h2">
            Physical Characteristics
          </Typography>
          <ul>
            <li>Gender: {gender}</li>
            <li>Height: {height}</li>
            <li>Hair Color: {hair_color}</li>
            <li>Eye Color: {eye_color}</li>
            <li>Skin Color: {skin_color}</li>
          </ul>
          <br/>
          <Typography variant="title" component="h2">
            About {name}'s HomeWorld: {homeworld.name}
          </Typography>
          <ul>
            <li>Diameter: {homeworld.diameter}</li>
            <li>Rotation Period: {homeworld.rotation_period}</li>
            <li>Orbital Period: {homeworld.orbital_period}</li>
            <li>Gravity: {homeworld.gravity}</li>
            <li>Terrain: {homeworld.terrain}</li>
            <li>Climate: {homeworld.climate}</li>
          </ul>
          <br/>
          <Link to="/">Go Back</Link>
        </Paper>
      </div>
    );
  }
}

Character.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Character);
