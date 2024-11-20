import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
    Alert,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Issue Filter</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.filterinput}
              placeholder="Type here"
            />
            <Button
              title="Apply"
              onPress={() => {
                // Dummy onPress function
                alert('Filter applied (dummy action)');
              }}
              color="#007BFF"
            />
          </View>
        </View>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#E9ECEF',
  },
  filterText: {
    fontSize: 16,
    color: '#6C757D',
  },
  header: {
    height: 50,
    backgroundColor: '#007BFF',
  },
  headerText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#343A40',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F1F3F5',
  },
  input: {
    height: 40,
    borderColor: '#CED4DA',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  formContainer: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#E9ECEF',
  },
  filterText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterinput: {
    flex: 1,
    height: 40,
    borderColor: '#CED4DA',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginRight: 10,
  },
});

const width= [40,80,80,100,60,100,200];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const dataRow = [
      issue.id,
      issue.status,
      issue.owner,
      issue.created.toDateString(),
      issue.effort,
      issue.due ? issue.due.toDateString() : '',
      issue.title,
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={dataRow} style={styles.row} textStyle={styles.text} widthArr={width} />
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initialize table header  ******/}
    const tableHead = ['ID', 'Status', 'Owner', 'Created', 'Effort', 'Due', 'Title'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
    <ScrollView horizontal={true}>
        <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row data={tableHead} widthArr={width} style={styles.header} textStyle={styles.headerText}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    {issueRows}
                </Table>
            </ScrollView>
        </View>
    </ScrollView>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {
        owner: '',
        title: '',
        effort: '',
        status: '',
        due: '',
      };
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setOwner(owner) {
      this.setState({ owner });
    }

    setTitle(title) {
      this.setState({ title });
    }

    setEffort(effort) {
      this.setState({ effort });
    }

    setStatus(status) {
      this.setState({ status });
    }

    setDue(due) {
      this.setState({ due });
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const newIssue = {
        owner: this.state.owner,
        title: this.state.title,
        effort: parseInt(this.state.effort, 10),
        status: this.state.status,
        due: new Date(this.state.due),
      };
      this.props.createIssue(newIssue);
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View style={styles.formContainer}>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput
            placeholder="Status"
            value={this.state.status}
            onChangeText={(text) => this.setStatus(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Owner"
            value={this.state.owner}
            onChangeText={(text) => this.setOwner(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Effort"
            value={this.state.effort}
            onChangeText={(text) => this.setEffort(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Due Date (YYYY-MM-DD)"
            value={this.state.due}
            onChangeText={(text) => this.setDue(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Title"
            value={this.state.title}
            onChangeText={(text) => this.setTitle(text)}
            style={styles.input}
          />
          <Button
            onPress={this.handleSubmit}
            title="Add Issue"
            color="#28A745"
          />
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { name: '' };
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setName(newname) {
      this.setState({ name: newname });
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const query = `mutation myaddToBlacklist ($newname: String!){
      addToBlacklist(nameInput: $newname)
    }`;
    const newname = this.state.name;
    console.log(newname);
    const data = await graphQLFetch(query, { newname });
    if (data) {
      Alert.alert('Name added to blacklist');
      this.setState({ name: '' });
      this.props.setCurrentScreen('IssueList');
    }
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View style={styles.formContainer}>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput
        placeholder="Name To Blacklist"
        value={this.state.name}
        onChangeText={(newname) => this.setName(newname)}
        style={styles.input}
        />
        <Button
          onPress={this.handleSubmit}
          title="Add To Blacklist"
          color="#DC3545"
        />
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.screen !== this.props.screen && this.props.screen === 'IssueList') {
        this.loadData();
      }
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;
    console.log(issue); 
    const data = await graphQLFetch(query, { issue });
    if (data) {
      Alert.alert('Issue added successfully');
      this.setState({
        owner: '',
        title: '',
        effort: '',
        status: '',
        due: '',
      });
      this.props.setCurrentScreen('IssueList');
    }
    }
    
    
    render() {
      const currentScreen = this.props.screen || 'IssueList';

      if (currentScreen === 'IssueAdd') {
        return (
          <IssueAdd 
            setCurrentScreen={this.props.setCurrentScreen} 
            createIssue={this.createIssue} 
          />
        );
      } else if (currentScreen === 'BlackList') {
        return <BlackList setCurrentScreen={this.props.setCurrentScreen} />;
      } else {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}


    {/****** Q2: Start Coding here. ******/}
    <IssueTable issues={this.state.issues} />
    {/****** Q2: Code ends here ******/}

    
    {/****** Q3: Start Coding here. ******/}
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    {/****** Q4: Code Ends here. ******/}
    </>
      
    );
  }
}
}