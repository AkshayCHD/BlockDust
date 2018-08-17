pragma solidity ^0.4.24;

contract MovieContract {
    struct movie {
        string MovieName;
        string MovieDescription;
        string DirectorName;
        uint rating;
        uint ratingCount;
        
    }
    mapping(string => movie) movies;
    
    function addMovie(string id, string Moviename, string MovieDescription, string DirectorName) public returns(bool){
        movies[id].MovieName = Moviename;
        movies[id].MovieDescription = MovieDescription;
        movies[id].DirectorName = DirectorName;
        movies[id].rating = 0;
        movies[id].ratingCount = 0;
        return true;
    }
    function rate(string id, uint rating) public returns(uint) {
        uint newRating = movies[id].rating*movies[id].ratingCount + rating;
        movies[id].ratingCount = movies[id].ratingCount + 1;
        movies[id].rating = newRating/movies[id].ratingCount;
        return movies[id].rating;
        
    }
    function getRating(string id) public view returns(uint) {
        return movies[id].rating;
    }
    
}
