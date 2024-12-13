package com.example.stockexchange.controller;

import com.example.stockexchange.model.Stock;
import com.example.stockexchange.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//@CrossOrigin(
//        origins = {
//                "http://192.168.49.2:30007",
//                "http://192.168.49.2:80"
//        },
//        methods = {
//                RequestMethod.OPTIONS,
//                RequestMethod.GET,
//                RequestMethod.PUT,
//                RequestMethod.DELETE,
//                RequestMethod.POST
//        })

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {
    @Autowired
    private StockService stockService;

    @PostMapping("/register")
    public Stock registerStock(@RequestBody Stock stock) {
        return stockService.registerStock(stock);
    }

    @GetMapping("/{symbol}")
    public Stock getStock(@PathVariable String symbol) {
        return stockService.getStockBySymbol(symbol);
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }
}
