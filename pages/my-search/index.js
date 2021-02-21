import React, { Component } from 'react';
import { Input } from 'antd';
import moment from 'moment'; 
import {Spin} from 'antd';
import WrapFetch from '../../components/tools/wrap-fetch';
import SearchResult from '../../components/my-search/search-result';
import KnowMeLayout from '../../components/layout';

const { Search } = Input;
class MySearch extends Component {
    state = {
        isShowImg: true,
        loading:false,
        tip: "正在查询",
        list: [],
        text: "",
        // start 滚动加载
        hasMore: true,
        pageNum: 0,
        pageSize: 20,
        total: 0
        // end
    };
    onSearchChange=(value)=>{
        console.log(value)
    }
    onSearchClick = (value) => {
        console.log(value)
        this.setState({ text: value,list: [] ,loading:true,isShowImg:false},this.getMore)
    };
    getMore=()=> {
        WrapFetch.get(
            {
                url: `/api/document/search`,
                queryParam: { text: this.state.text, page: this.state.pageNum, pageSize: this.state.pageSize }
            }
        ).then(
            (data) => {
                data.content.forEach((item)=>{
                    item.ts=moment(item.ts).format("YYYY-MM-DD HH:mm:ss");
                })
                this.setState({ list: this.state.list.concat(data.content), total: data.totalElements, hasMore: data.totalPages > 1, loading: false });
            }
        );
    }
    render() {
        let SearchResults = [];
        this.state.list.forEach((element, index, array) => {
            SearchResults.push(<SearchResult element={element} key={index} loading={this.state.loading} />);
        });
        return (
            <KnowMeLayout>
                <Search size="large" className={this.state.isShowImg?"search_normal":"search_hidden_img"} 
                placeholder="" onSearch={value => this.onSearchClick(value)} enterButton
                 onChange={this.onSearchChange}/>
                <Spin spinning={this.state.loading} tip={this.state.tip}>
                    {SearchResults}
                </Spin>
            </KnowMeLayout>
        );
    }
}

export default MySearch;