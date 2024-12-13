package com.example.stockexchange.controller;

import com.example.stockexchange.model.Stock;
import com.example.stockexchange.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {
    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

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
        logger.info("Fetching all stocks");
        try {
            List<Stock> stocks = stockService.getAllStocks();
            logger.debug("Fetched {} stocks", stocks.size());
            return ResponseEntity.ok(stocks);
        } catch (Exception e) {
            logger.error("Error fetching stocks: {}", e.getMessage());
            throw e;
        }
    }
}
