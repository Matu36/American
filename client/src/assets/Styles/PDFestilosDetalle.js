import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: "Open Sans",
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "#000000",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 10,
  },
  logo: {
    width: 150,
    height: 60,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#ffcc00",
    paddingBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    color: "#000",
  },
  label: {
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffcc00",
    width: "100%",
    marginBottom: 10,
  },
  pdfdownloadbutton: {
    display: "inline-block",
    padding: 10,
    backgroundColor: "#ffcc00",
    color: "#000",
    borderRadius: 5,
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "center",
  },
  marcaAgua: {
    textTransform: "uppercase",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)",
    fontSize: 90,
    color: "#ffcc00",
    opacity: 0.2,
  },
  contactContainer: {
    padding: 10,
    flexDirection: "row",
  },

  contactHeader: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 8,
    marginBottom: 3,
  },
  empresaImage: { height: "180px", marginRight: 20 },

  boldText: {
    fontWeight: "bold",
  },
});
