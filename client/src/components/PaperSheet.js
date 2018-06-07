import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/* Additional Dependencies & Components */
import SimpleCard from './SimpleCard';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

function PaperSheet(props) {
  const { classes, data } = props;
  console.log("props.match.path",props.match.path);

  const { characters, episode, title } = data;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="display1" component="h1">
          Star Wars Episode {episode}: {title}
        </Typography>
        <br />
        <Typography variant="title" component="h2">
          Characters
        </Typography>
          <div className="flex flex-wrap">
          {
            characters.map(character => <SimpleCard key={character._id} data={character} />)
          }
          </div>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
