import React from 'react'

import Tasks from 'components/Tasks/Tasks.jsx'

import Grade from '@material-ui/icons/Grade'

class Tab extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      {
        tabName: 'PUBLISHED',
        tabIcon: Grade,
        tabContent: (
          <Tasks
            tableHeaderColor='primary'
            tableHead={['Name', 'Description', 'Status', 'Modify']}
            checkedIndexes={[]}
            tasks={this.state.questionnairePublishedList}
            onEditClicked={(index) => this.handleEditQuestionnaireClick(index, 'PUBLISHED')}
            onDeleteClicked={(index) => this.handleDeleteQuestionnaireClick(index, 'PUBLISHED')}
          />
        )
      }

    )
  }
}

export default Tab
