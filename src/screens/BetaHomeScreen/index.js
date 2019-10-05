import React from 'react'

class BetaHomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ScrollView>
            {this.state.hasData && (
              <UserSection hasData={this.state.hasData} data={this.state.data} />
            )}
            {this.state.hasData && (
              <Image
                source={this.getImage(this.state.data.giveaway.image.file_name)}
                style={{width: '100%'}}
              />
            )}
            </ScrollView>
        )
    }
}