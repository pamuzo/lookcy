import {
  View,
  Text,
  RefreshControl,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Color from "../styles/colorStyle";

export default function NewsList() {
  const [articles, setArticles] = useState([]);
  const [title, setTile] = useState("");
  const [discription, setDiscription] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=entertainment&apiKey=0e1476f066ac48cebec9289869c89143`
      );

      const items = response.data.articles;
      const articleItem = items[Math.floor(Math.random() * items.length)];
      setArticles(articleItem);
      setData(articleItem);
      setTile(articleItem.title.slice(0, 40));
      setDiscription(articleItem.description.slice(0, 120));
    };

    getArticles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setArticles(data);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.mediumTxt}>{title}</Text>
      <Image
        source={{ uri: articles.urlToImage }}
        style={{ width: "100%", height: 300 }}
      />
      <Text style={styles.smallTxt}>
        {discription} <Text style={{ color: Color.gray }}>.....more</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 10,
    fontSize: 18,
    fontFamily: "roboto-regular",
  },

  mediumTxt: {
    fontSize: 16,
    paddingLeft: 20,
    paddingBottom: 7,
    fontWeight: "bold",
    color: Color.blue,
    fontFamily: "roboto-regular",
  },
  smallTxt: {
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 7,
    color: Color.black,
    fontFamily: "roboto-light",
  },
});
