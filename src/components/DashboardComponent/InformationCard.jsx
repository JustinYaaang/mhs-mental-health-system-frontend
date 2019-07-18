import React from 'react'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Tasks from 'components/Tasks/Tasks.jsx'
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import swal from 'sweetalert'
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import All from '@material-ui/icons/AllInboxOutlined'

class InformationCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '',
      category: '',
      title: '',
      value: '',
      daterange: '',
      classes: ''
    }
  }

  componentWillMount () {
    this.setState({
      color: this.props.color,
      title: this.props.title,
      value: this.props.value,
      daterange: this.props.daterange,
      classes: this.props.classes
    })
  }
  render () {
    console.log(this.state.value)
    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card>
          <CardHeader color={this.state.color} stats icon>
            <CardIcon color={this.state.color}>
              <All />
            </CardIcon>
            <p className={this.state.classes.cardCategory}>{this.state.title}</p>
            <h3 className={this.state.classes.cardTitle}>{this.state.value}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={this.state.classes.stats}>
              <DateRange />
              {this.state.daterange}
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}

export default InformationCard
