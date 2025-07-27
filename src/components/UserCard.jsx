import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";

export default function UserCard({ user }) {
  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.3s",
        boxShadow: 3,
        "&:hover .hover-actions": {
          opacity: 1,
          visibility: "visible",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=576b49ff&color=fff&size=512`}
        alt={`${user.firstName} ${user.lastName}`}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {user.bio}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmailIcon fontSize="small" /> {user.email}
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PhoneAndroidIcon fontSize="small" /> {user.phoneNumber}
          </Typography>
        </Box>
      </CardContent>

      <Box
        className="hover-actions"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#576b49ff",
          p: 1,
          opacity: 0,
          visibility: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Tooltip
          title="VIEW PROFILE"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#8ba57d",
                color: "white",
                fontSize: "0.7rem",
              },
            },
          }}
        >
          <Button sx={{ color: "white" }}>
            <PersonIcon />
          </Button>
        </Tooltip>
        <Tooltip
          title="MORE INFO"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#8ba57d",
                color: "white",
                fontSize: "0.7rem",
              },
            },
          }}
        >
          <Button sx={{ color: "white" }}>
            <InfoIcon />
          </Button>
        </Tooltip>
      </Box>
    </Card>
  );
}
