import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import ProductCard from "../product-card";

const useStyles = makeStyles(() => ({
    selectProductBlock: {
        width:"100%",
        marginBottom: "40px",
    },
    selectProductRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -20px",
    },
    selectProductCol: {
        width: "100%",
        padding: "0 20px",
    },
}));

const SelectProduct = () => {
    const classes = useStyles();

    return (
           <Box className={classes.selectProductRow}>
                <Box className={classes.selectProductBlock}>
                <Box className={classes.selectProductCol}>
                        <ProductCard />
                </Box>
             </Box>
         </Box> 
        
    );
};

export default SelectProduct;
