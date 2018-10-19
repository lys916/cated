import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {addToCart} from './actions/itemAction';
import { connect } from 'react-redux';



 const items = [
   {
     image: "https://lh3.googleusercontent.com/UOJDyCBrSpS1nniq-0wbjPEMc4tLAxeoNlTM3wT35lqH5g4yGCJ7QeBQuVeDGrDj4XbjCbxJ__5LfWTY3qBh5YG16uztJSptOvX2_cTbeu2Sue1hUMl0EzOLq_QBjZo-IRWieOwFN7co4tE_YhtcsQSBuAMb2hXOPgO8BRJoBxJj-Wi49QImm94UOP8QAxfU0ykYICM6pxkK4L9xul4K1lQ2-aUzbVEaxEGs4uNm-vMOthxgcCTeAtFRgG3Xg_xT2gD0LHF88kWGCVIXnQFwUedwq4Pn5KU4VPKe4zpRbJLJfFkAxTNZB33dejVtkJ5a-EjJAxk1gZpC9Nb06q3WuZmuRg6zCxfDN-8gYlq2UWiKUvNOFV7a7GiI5BEF9S0OEaT8DiuVm4NE3X-F1QXKAH7OfsIPMJ8wIUORs0OH6tx200675g01Bzjktl8_JhL3O4zb-mkBT84f4YjTuHVoC6-TTVCjsqzTx4aSI0PGT2V3MBmSS3CFT6jbk0BoIBJBzAotGiGO_RdDOUTnavoEDxe_mnphZNg6C5OLJX4gz3jlFKF_ejngumfMemsL_oK4unYNA5IvE07uyVDh2FKnhuH8ezLIgjqdcMdlwALsD8yA6yxJZ822IT73nc20xg=w1148-h572-no",
     name: 'Garlic Black Pepper Wing',
     desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
     tags: 'Garlic Black Pepper Chicken Wing Mid Joint',
     price: 3.99,
     type: 'grill',
     id: 50
   },
   {
    image: "https://lh3.googleusercontent.com/Ej4dQ6jIuG3_ew4wXKzZCV34Zae8KRc_qAPFwQjoUyarJGCuYgV0t_De7AJTotzmNWiQzOHYhRVXLywjuFHo2PQ1lz2zl4jEZdKoULUunZj7jlhQ9WMYwGohvLQVysFGm4bzWqLHZlMHL2jdJFEmcwgc1ikW9z3xNH8DFQV38T3vw5DaltijPNlbW01EjWneJxhCGBi-r1FF0hC1FIeA0_Ksn7-36I4AOUY5HWeq3dscrrm1qn79z-DsW8sztB-0QDQJAzSS42Ow7HZLNpqKPWo-k_QVHWkBt7B6bQ0eBquEdGjUwRLOjOe8XUZDBdwbVsvYCkwRf-rXCcbXYsLWvm-LoMQ8DV7-XXugFMNGnQoR8zZlYztUe7Vo3U9dlrnxGqndrZ1v5quW1I5FGZug35uv5x2xKCfqU-Tr5I1EAk_39Wbz0eXEBVB9zU9WYz-_84oqlY8yUs-0_z6Gebhjx8dxigIcd-vp3pQU2LJ7gIhqS8OgO_xFRUokopSrm-TKAm_xhkPTsXikFwvYnT1VnVEsSVRiCTI_ppN85zvfjtVxAgE1P4uvQJ8kTDWMDv4d7LlX0CztoX2xTqrQg9dxx8FePagfRr6Wx9yoVnEwPJwBI_5Gh5aEKPIl-MxbVQ=w516-h245-no",
    name: "Tri Tip Lightly Marinated",
    tags: 'Tri Tip Lightly Marinated',
    price: 7.99,
    type: 'grill',
    id: 51
  },
  {
    image: "https://lh3.googleusercontent.com/7x6vhKZPqfHYLz7KlYouF1cM_kq3vGddQVhUsKkNYYMmXJbcI1GQabBEn6_wI6NfwEHWdVFfukMGBRhuJVtIoQnRuNN4YzBvK9dPAUnLb36q3J7HQMCMtbjp-iCwIQ4KoIpgYJc9Nwn14eNUTLS8aBXqg3aOuPn_sxMMP9xVmyKMPkVIcG7RP3SFIqCZlSCOZai7RrIhIqeyKo8G6JiwFkt9vjxvJtjoptPOwNDh9xLMACcoFfRBJHBpDdKhUYqx45bFnSR1NKR9BlkSe0dAe9aNxfr0Umwfuv7fgxI-i7yjCipCb4QUv1kiW6kBxLndgKGqKrivtjj3nt6WXhjm3VhNKh0-LsVbyo1RW9foQ3FJZ51KlQ1KZYXGiHI_Mjo9vsNreyp-bip5U8z1tK5hfd6iRHKuwwOAAIoRk6pnDvJAupopLP9df6IAzu95Epvi6R7_4zrtKSp2Tmq8FbfbyxG8ni4Q79ufkQOYvp1b7t2rmeszN283TeA0-cHiqB3FBgDrxEz-d4QxMe0QA7X5INuyRvlmhKufcGn9QcMxgFguEKs0jso4Y9aOHO5W5x2mxc3O_sA8h1fWcxRY6UMd10D4fWNSKbWfAlgiErNavEkdlJOeiI9IsZE8Z0r4Xw=w711-h266-no",
    name: 'Korean BBQ Short Ribs',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    tags: 'Korean BBQ Short Ribs',
    price: 4.99,
    id: 52
  },
  {
    image: "https://lh3.googleusercontent.com/irarP4XB40ezmAsUB3vg6dckdv37Mu8CPHYrDKq9c1kGky2y94Ke27DnINxIPD4SPAJ0dHS1Hjv05xCQyLmz5OX8sXifsrUrDxQ3lSG2g-FdJU8QFm_syoLyDEnX7CqjUGPAADON0MP77oe8Ax7_lLD1lHytzhw8QGgLRa3oS-CGDEfR7Ek5hJqo_pciMwAGaHbzF8u2XthBcC3xUq9DaqJrXqx893au0EDon5jyRABde7jdnLjGJVN-obLvCqOnNfZCM4RikrYW463K0y7YwVTeb_Ypm-MZYP4XZ_b77mWjUggxJExldFbN3k7Zhw_IQ_JHIz3_522pvMmQ37pIt_sqtATMZROmQSrdRyWlbiOKU0NFN9dkdKqY1baWLZ73-oCKa8sm-a517kp-Nyk2txJtwDTUsiperVhDBW_N0LbCQmzbQVL9g-T8Kj_yNiXZr6lftoN_Ve5aPK6kBXzT38o-OFhsf6ItzBj2IfTbCFL276FxpRzGuH04HCPfATTy8ugd7KJQfI9XLKf0ltKiRS8BFDEA2IiNkET8GpiA301595zRyn85rV7iQs9g6uOI6L3QgedyF5AliXE_eAOYasqxaqaXlb1kNyJxQI1SpYLsBu2t1uOVmMU6GsVmzQ=w400-h220-no",
    name: 'Sweet Pepper Ribs',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: 3.99,
    type: 'grill',
    id: 53
  },
  {
    image: "https://lh3.googleusercontent.com/whf-r7ZgINEwWFvdTXg7F_D489CXhYgibZNllqpK_GDKhkfC6WwEcalvgtY5fKqFwYO42J_fFZfmB-6uxZUL4pwVUjeJwDiRNWTOlZ6swIDs4N_Y92j_F90Zy82jBSVPBwNnFh2LBeEn_0ZY1DAkppTKBZYe-Guwrt_O4N4FGKNrkWxEhNbMZRw0wXK1GZ1eugNkDlq3TJGXVFxKmseNvbSRqaxQPzdPeQbL5XkLIXen_A1vhbfuhTuSEen0FcKyXd_9ll4Aiq3bSXjdX3n32EWu6tH6BRB5qnQFuA_-fw4yl22re6ppdBAV1Ym30EPvKHYIhZ6CSC2awEg71ODogACgIrKI_pjeLHu6NDiulkTCfDcgaBVLecj-jj5cnMyw6UdFnZkQXHbsKpOpcvmxGoeR8tZB84ovUTpXgcBsPZB5hum1Ot0dKTPAsXxMlPsM1Jg1o87s6Cz_H3Z6vGHtDmE-6F0um7B8vD8zh3erkPXekP-Pd-qIu6TsxC47WFzKNW2jBlLNdgGsFGYpCHuA4kojEpXbcvHZktFnJuuaH0qYNZssXFHANYS7DOTx48NcO4vPu3RjRBXaSgFa0-HQ5n4EZGzkriErxluTTWg1cKjjDH0O8Az56rYdHnITqQ=w380-h229-no",
    name: 'Pork Belly Lightly Marinated',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: 4.99,
    type: 'grill',
    id: 55
  },
  {
    image: "https://lh3.googleusercontent.com/QghZWhl1h7A-_jXAP_-GNd6s_2lG4GbDvDkHWzffjVlvnATshS0dg1MLCHJAX0ksyD4hPIFlCfXNM4FY1U9TAbRVggivQuMUztCC2y2YNBbMRExC7elPbtDuurZgxrNDF1VJ2OpiDEwTeoUW48FiGv-RdTRQzGxYul31crD1nCfXvnzvzIfzDUrgkgwGCUdhvHwlhhEIVF4LVkmKm7ou_RDvBh7_-zTPuI69HZizWyEI6WuX1oE3fwYICA_6B34G-5kPFiwYk6f98j16hiqLA6fYWRKGBGoSXmKiUVRSxKB_eAshVfnWfrYvY5-M5w6rIz-5rI-GrjcTSbUVYq4opyjAz6T2jl69lVtUtm38gtH1wTZoK7eZboqEkUoGSsZB0xFiBesb_uPIsZIefu6_ku7pvLmrBEPGu-Pld6oQbbnlXCX9gPuojsDNlsXuVp6j30GTks0-NYuIS9EWnQCq3rkMEzXcCb48vAF2RStKhuh3Zwzopene2FVMJ5I0anfufnm-YXQr6CHq4NVHC2Jjb1q0lMxVa7HwGS7MTnKoZGKxtB0XYW8quljG9jc56gQ9JOH3DB3UGFuSeLccIuakwdf1Bi7yo8dAkqJmmbKwKSLmxYH0385ID1RN9RqQPg=w583-h347-no",
    name: 'Top Round Steak',
    desc: 'This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors. This is one of the party favorites. It is spicy and full of flavors',
    price: 5.99,
    type: 'grill',
    id: 6
  }
  

 ]


class GrillingList extends React.Component {
  state = { 
    expanded: null,
    weight: 1,
    activeMenu: 'All'
  };

  handleExpandClick = (index) => {
    if(this.state.expanded === index){
      this.setState({expanded: null, selectedSize: null});
    }else{
      this.setState({ expanded: index, selectedSize: null }, ()=>{
        console.log(this.state.expanded);
      });
    }
    
  };

  toggleSelectSize = (size)=>{
    if(size === this.state.selectedSize){
      this.setState({selectedSize: null});
    }else{
    this.setState({selectedSize: size}, ()=>{
      console.log(this.state.selectedSize);
    });
  }
  }

  addToCart = ()=>{
    let item = items[this.state.expanded];
    item.lb = this.state.weight;
    item.totalPrice = Number.parseFloat((item.price * item.lb)).toFixed(2);
    this.props.addToCart(item)
    this.setState({expanded: null, selectedSize: null});
  }

  toggleActive = (menu)=>{
		this.setState({activeMenu: menu});
  }
  
  increaseWeight = ()=>{
    this.setState({weight: this.state.weight + 1});
  }
  decreaseWeight = ()=>{
    if(this.state.weight > 1){
      this.setState({weight: this.state.weight - 1});
    }
  }

  render(){
    const { classes, cart } = this.props;
    let menuItems;
    if(this.state.activeMenu === 'All'){
      menuItems = items;
    }else{
      menuItems = items.filter((item)=>{
        return item.name.includes(this.state.activeMenu);
      });
    }
  return (
    <div className={classes.root}>
    {menuItems.map((item, index)=>{
      return(
        <Card className={classes.card} >
      <CardActionArea onClick={()=>{this.handleExpandClick(index)}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="160"
          image={item.image}
          title="Contemplative Reptile"
          
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {item.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
           {item.desc}
          </Typography>
        </CardContent>

          <IconButton>
            <ExpandMoreIcon />
          </IconButton>

      </CardActionArea>


      <Collapse in={this.state.expanded === index ? true : false} timeout="auto" unmountOnExit>
          <CardContent className={classes.selections}>
            <div className={classes.select}>Select Weight</div>
            <div>${item.price} per lb</div>
            <div className={classes.weight}>
              <div onClick={this.decreaseWeight} className={classes.minus}>-</div>
              <input className={classes.input} value={this.state.weight} />
              <div onClick={this.increaseWeight} className={classes.minus}>+</div>
            </div>
            <Button size="medium" className={classes.addCart} onClick={this.addToCart}>
          add to cart
        </Button>

          </CardContent>
        </Collapse>

    </Card>
      )
      
    })}
    
    </div>
  );
  }
  
}

const styles = {
  root: {
    padding: 10
  },
  card: {
    textAlign: 'left',
    width: '100%',
    marginTop: 20
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  },
  size: {
    margin: 5
  },
  sizes: {
    display: 'flex',
    justifyContent: 'center'
  },
  selections: {
    textAlign: 'center',
  },
  select: {
    fontSize: 13
  },
  price: {
    fontSize: 13
  },
  activeButton: {
    background: '#3651b5',
    border: '1px solid #3651b5',
    color: 'white',
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 7,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 4
  },
  button: {
    background: 'white',
    border: '1px solid #95a6e5',
    color: '#3651b5',
    paddingTop: 7,
    paddingRight: 15,
    paddingBottom: 7,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 4
  },
  addCart: {
    width: 200,
    borderRadius: 5,
    border: '1px solid green',
    color: 'green',
    marginTop: 10
  },
	subMenus: {
		display: 'flex',
		flexWrap: 'wrap',
    justifyContent: 'center'
	},
	menu: {
		background: '#bbbbbb',
		margin: '3px 3px 3px 3px',
		padding: 4,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 4,
		color: 'blue',
		fontSize: 14
	},
	activeMenu: {
		background: 'gray',
		margin: '3px 3px 3px 3px',
		padding: 4,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 4,
		color: 'white',
		fontSize: 14
  },
  weight: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center'
  },
  input: {
    width: 50
  },
  minus: {
    border: '1px solid #dedede',
    padding: 5,
    width: 20
  }

};

GrillingList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart
	}
}

export default connect(mapStateToProps, {addToCart})(withStyles(styles)(GrillingList));
